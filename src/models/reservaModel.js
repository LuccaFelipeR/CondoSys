const db = require('../database/connection');

const AREAS_VALIDAS = [
  'Salão de Festas',
  'Churrasqueira',
  'Piscina',
  'Quadra',
  'Sala de Jogos'
];

const STATUS_VALIDOS = ['Pendente', 'Aprovada', 'Cancelada', 'Concluída'];

function validarCampos(dados) {
  const { area, morador, data, horario, status } = dados;

  if (!area || !morador || !data || !horario) {
    throw new Error('Campos obrigatórios: area, morador, data, horario');
  }

  if (!AREAS_VALIDAS.includes(area)) {
    throw new Error(`Área inválida. Opções: ${AREAS_VALIDAS.join(', ')}`);
  }

  if (status && !STATUS_VALIDOS.includes(status)) {
    throw new Error(`Status inválido. Opções: ${STATUS_VALIDOS.join(', ')}`);
  }

  // Valida formato de data (YYYY-MM-DD)
  const regexData = /^\d{4}-\d{2}-\d{2}$/;
  if (!regexData.test(data)) {
    throw new Error('Data inválida. Use o formato YYYY-MM-DD');
  }

  // Valida formato do horário (HH:MM–HH:MM)
  const partesHorario = horario.split(/[–-]/);
  if (partesHorario.length !== 2) {
    throw new Error('Horário inválido. Use o formato HH:MM–HH:MM');
  }

  const regexHorario = /^\d{2}:\d{2}$/;
  const inicio = partesHorario[0].trim();
  const fim = partesHorario[1].trim();

  if (!regexHorario.test(inicio) || !regexHorario.test(fim)) {
    throw new Error('Horário inválido. Use o formato HH:MM–HH:MM');
  }

  if (inicio >= fim) {
    throw new Error('Horário de início deve ser anterior ao horário de término');
  }
}

async function verificarConflito(area, data, horario_inicio, horario_fim, idIgnorar = null) {
  const query = `
    SELECT id_reserva FROM reservas
    WHERE area_comum = $1
      AND data_reserva = $2
      AND status != 'Cancelada'
      AND horario_inicio < $4
      AND horario_fim > $3
      ${idIgnorar ? 'AND id_reserva != $5' : ''}
  `;

  const params = idIgnorar
    ? [area, data, horario_inicio, horario_fim, idIgnorar]
    : [area, data, horario_inicio, horario_fim];

  const resultado = await db.query(query, params);
  return resultado.rows.length > 0;
}

async function listarTodos() { //innerjoin com com moradores
  const query = `
    SELECT
      r.id_reserva AS id,
      r.area_comum AS area,
      m.nome AS morador,
      TO_CHAR(r.data_reserva, 'YYYY-MM-DD') AS data,
      CONCAT(TO_CHAR(r.horario_inicio, 'HH24:MI'), '–', TO_CHAR(r.horario_fim, 'HH24:MI')) AS horario,
      r.status
    FROM reservas r
    INNER JOIN moradores m ON r.id_morador = m.id_morador
    ORDER BY r.data_reserva DESC, r.horario_inicio DESC
  `;

  const resultado = await db.query(query);
  return resultado.rows;
}

async function cadastrar(dadosReserva) {
  validarCampos(dadosReserva);

  const moradorQuery = await db.query(
    'SELECT id_morador FROM moradores WHERE TRIM(nome) ILIKE TRIM($1)',
    [dadosReserva.morador]
  );

  if (moradorQuery.rows.length === 0) {
    throw new Error('Morador não encontrado. Digite o nome exato do cadastro.');
  }

  const id_morador = moradorQuery.rows[0].id_morador;
  const partesHorario = dadosReserva.horario.split(/[–-]/);
  const horario_inicio = partesHorario[0].trim();
  const horario_fim = partesHorario[1].trim();

  const temConflito = await verificarConflito(dadosReserva.area, dadosReserva.data, horario_inicio, horario_fim);
  if (temConflito) {
    throw new Error(`Já existe uma reserva para ${dadosReserva.area} nesse horário`);
  }

  const query = `
    INSERT INTO reservas (area_comum, data_reserva, horario_inicio, horario_fim, status, id_morador)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id_reserva AS id;
  `;

  const resultado = await db.query(query, [
    dadosReserva.area,
    dadosReserva.data,
    horario_inicio,
    horario_fim,
    dadosReserva.status || 'Pendente',
    id_morador
  ]);

  return resultado.rows[0];
}

async function buscarPorId(id) {
  if (!id) return null;

  const query = `
    SELECT 
      r.id_reserva AS id,
      r.area_comum AS area,
      m.nome AS morador,
      TO_CHAR(r.data_reserva, 'YYYY-MM-DD') AS data,
      CONCAT(TO_CHAR(r.horario_inicio, 'HH24:MI'), '–', TO_CHAR(r.horario_fim, 'HH24:MI')) AS horario,
      r.status
    FROM reservas r
    INNER JOIN moradores m ON r.id_morador = m.id_morador
    WHERE r.id_reserva = $1;
  `;

  const resultado = await db.query(query, [id]);
  return resultado.rows[0] || null;
}

async function atualizar(id, dadosAtualizados) {
  validarCampos(dadosAtualizados);

  const reservaExiste = await buscarPorId(id);
  if (!reservaExiste) throw new Error('Reserva não encontrada.');

  const moradorQuery = await db.query(
    'SELECT id_morador FROM moradores WHERE TRIM(nome) ILIKE TRIM($1)',
    [dadosAtualizados.morador]
  );
  if (moradorQuery.rows.length === 0) throw new Error('Morador não encontrado.');
  const id_morador = moradorQuery.rows[0].id_morador;

  const partesHorario = dadosAtualizados.horario.split(/[–-]/);
  const horario_inicio = partesHorario[0].trim();
  const horario_fim = partesHorario[1].trim();

  const temConflito = await verificarConflito(dadosAtualizados.area, dadosAtualizados.data, horario_inicio, horario_fim, id);
  if (temConflito) {
    throw new Error(`Já existe uma reserva para ${dadosAtualizados.area} nesse horário`);
  }

  const query = `
    UPDATE reservas 
    SET area_comum = $1, data_reserva = $2, horario_inicio = $3, horario_fim = $4, status = $5, id_morador = $6
    WHERE id_reserva = $7;
  `;

  await db.query(query, [
    dadosAtualizados.area,
    dadosAtualizados.data,
    horario_inicio,
    horario_fim,
    dadosAtualizados.status,
    id_morador,
    id
  ]);
const reservas = [];

function listarTodos() {
  return reservas;
}

function gerarNovoId() {
  if (reservas.length === 0) {
    return 1;
  }

  return reservas[reservas.length - 1].id + 1;
}

function cadastrar(dadosReserva) {
  const novaReserva = {
    id: gerarNovoId(),
    ...dadosReserva
  };

  reservas.push(novaReserva);

  return novaReserva;
}

function buscarPorId(id) {
  return reservas.find(reserva => reserva.id === Number(id));
}

function atualizar(id, dadosAtualizados) {
  const reserva = buscarPorId(id);

  if (!reserva) {
    return null;
  }

  reserva.area = dadosAtualizados.area;
  reserva.morador = dadosAtualizados.morador;
  reserva.data = dadosAtualizados.data;
  reserva.horario = dadosAtualizados.horario;
  reserva.status = dadosAtualizados.status;

  return reserva;
}

function excluir(id) {
  const index = reservas.findIndex(reserva => reserva.id === Number(id));

  if (index === -1) {
    return false;
  }

  reservas.splice(index, 1);

  return true;
}

async function excluir(id) {
  if (!id) return false;
  const query = 'DELETE FROM reservas WHERE id_reserva = $1;';
  const resultado = await db.query(query, [id]);
  return resultado.rowCount > 0;
}

async function contarTodos() {
  const resultado = await db.query('SELECT COUNT(*) FROM reservas;');
  return parseInt(resultado.rows[0].count, 10);
function contarTodos() {
  return reservas.length;
}

module.exports = {
  listarTodos,
  cadastrar,
  buscarPorId,
  atualizar,
  excluir,
  contarTodos
};