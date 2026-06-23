const db = require('../database/connection');

async function listarTodos() {
  const query = `
  SELECT
  r.id_reserva AS id,
  r.area_comum As area,
  m.nome AS morador,
  TO_CHAR(r.data_reserva, 'YYYY-MM-DD') AS data,
  CONCAT(TO_CHAR(r.horario_inicio, 'HH24:MI'), '–', TO_CHAR(r.horario_fim, 'HH24:MI')) AS horario,
  r.status
    FROM reservas r
    INNER JOIN moradores m ON r.id_morador = m.id_morador
    ORDER BY r.data_reserva DESC, r.horario_inicio DESC`;

  const resultado = await db.query(query);
  return resultado.rows;
}

async function cadastrar(dadosReserva) {
  
  const moradorQuery = await db.query('SELECT id_morador FROM moradores WHERE TRIM(nome) ILIKE TRIM($1)', [dadosReserva.morador]);
  
  if (moradorQuery.rows.length === 0) {
    throw new Error('Morador não encontrado no banco de dados. Digite o nome exato do cadastro.');
  }
  const id_morador = moradorQuery.rows[0].id_morador;

  
  const partesHorario = dadosReserva.horario.split(/[–-]/); 
  const horario_inicio = partesHorario[0].trim();
  const horario_fim = partesHorario[1].trim();

  const insertQuery = `
    INSERT INTO reservas (area_comum, data_reserva, horario_inicio, modifier_fim, status, id_morador)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id_reserva AS id;
  `;
  
  
  const insertQueryCorrigida = insertQuery.replace('modifier_fim', 'horario_fim');

  const resultado = await db.query(insertQueryCorrigida, [
    dadosReserva.area,
    dadosReserva.data,
    horario_inicio,
    horario_fim,
    dadosReserva.status,
    id_morador
  ]);

  return resultado.rows[0];
}

async function buscarPorId(id) {
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
  const moradorQuery = await db.query('SELECT id_morador FROM moradores WHERE TRIM(nome) ILIKE TRIM($1)', [dadosAtualizados.morador]);
  if (moradorQuery.rows.length === 0) throw new Error('Morador não encontrado.');
  const id_morador = moradorQuery.rows[0].id_morador;

  const partesHorario = dadosAtualizados.horario.split(/[–-]/); 
  const horario_inicio = partesHorario[0].trim();
  const horario_fim = partesHorario[1].trim();

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

  return true;
}

async function excluir(id) {
  const query = 'DELETE FROM reservas WHERE id_reserva = $1;';
  const resultado = await db.query(query, [id]);
  return resultado.rowCount > 0;
}

async function contarTodos() {
  const resultado = await db.query('SELECT COUNT(*) FROM reservas;');
  return parseInt(resultado.rows[0].count, 10);
}

module.exports = {
  listarTodos,
  cadastrar,
  buscarPorId,
  atualizar,
  excluir,
  contarTodos
};
