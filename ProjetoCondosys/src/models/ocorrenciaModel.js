const pool = require('../database/connection');

function formatarDataParaEJS(data) {
  if (!data) return '';
  if (data instanceof Date) {
    // Ajusta para o fuso horário local antes de pegar o YYYY-MM-DD
    const offset = data.getTimezoneOffset();
    const dataLocal = new Date(data.getTime() - (offset * 60 * 1000));
    return dataLocal.toISOString().split('T')[0];
  }
  return data;
}

const statusMap = {
  'Aberta': 'Pendente',
  'Pendente': 'Pendente',
  'Em Andamento': 'Em Andamento',
  'Resolvido': 'Resolvido'
};

async function listarTodos() {
  const query = `
    SELECT 
      o.id_ocorrencia AS id,
      o.titulo,
      o.descricao,
      o.data_abertura AS data,
      o.status,
      o.prioridade,
      m.nome AS morador,
      CONCAT('Apto ', u.numero, ' — Bloco ', u.bloco) AS unidade
    FROM ocorrencias o
    JOIN moradores m ON o.id_morador = m.id_morador
    JOIN unidades u ON m.id_unidade = u.id_unidade
    ORDER BY o.data_abertura DESC;
  `;
  const { rows } = await pool.query(query);
  return rows.map(r => ({
    ...r,
    data: formatarDataParaEJS(r.data),
    status: statusMap[r.status] || r.status
  }));
}

async function buscarPorId(id) {
  const query = `
    SELECT 
      o.id_ocorrencia AS id,
      o.titulo,
      o.descricao,
      o.data_abertura AS data,
      o.status,
      o.prioridade,
      m.nome AS morador,
      CONCAT('Apto ', u.numero, ' — Bloco ', u.bloco) AS unidade
    FROM ocorrencias o
    JOIN moradores m ON o.id_morador = m.id_morador
    JOIN unidades u ON m.id_unidade = u.id_unidade
    WHERE o.id_ocorrencia = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  if (rows.length === 0) return null;
  return {
    ...rows[0],
    data: formatarDataParaEJS(rows[0].data),
    status: statusMap[rows[0].status] || rows[0].status
  };
}

async function criar(dados) {
  // Buscar morador pelo nome para obter o id_morador
  const resMorador = await pool.query(
    'SELECT id_morador FROM moradores WHERE LOWER(nome) = LOWER($1) LIMIT 1',
    [dados.morador.trim()]
  );

  if (resMorador.rowCount === 0) {
    throw new Error(`O morador "${dados.morador}" não foi encontrado no sistema.`);
  }

  const id_morador = resMorador.rows[0].id_morador;

  const query = `
    INSERT INTO ocorrencias (titulo, descricao, data_abertura, status, prioridade, id_morador)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id_ocorrencia AS id;
  `;

  const { rows } = await pool.query(query, [
    dados.titulo.trim(),
    dados.descricao.trim(),
    dados.data, // Data informada pelo usuário no formulário
    dados.status,
    dados.prioridade || 'Normal',
    id_morador
  ]);

  return rows[0];
}

async function atualizar(id, dados) {
  // Buscar morador pelo nome
  const resMorador = await pool.query(
    'SELECT id_morador FROM moradores WHERE LOWER(nome) = LOWER($1) LIMIT 1',
    [dados.morador.trim()]
  );

  if (resMorador.rowCount === 0) {
    throw new Error(`O morador "${dados.morador}" não foi encontrado no sistema.`);
  }

  const id_morador = resMorador.rows[0].id_morador;

  const query = `
    UPDATE ocorrencias
    SET titulo = $1, descricao = $2, data_abertura = $3, status = $4, id_morador = $5
    WHERE id_ocorrencia = $6;
  `;

  const { rowCount } = await pool.query(query, [
    dados.titulo.trim(),
    dados.descricao.trim(),
    dados.data,
    dados.status,
    id_morador,
    id
  ]);

  return rowCount > 0;
}

async function excluir(id) {
  const query = 'DELETE FROM ocorrencias WHERE id_ocorrencia = $1';
  const { rowCount } = await pool.query(query, [id]);
  return rowCount > 0;
}

async function contarTodos() {
  const { rows } = await pool.query('SELECT COUNT(*) AS total FROM ocorrencias');
  return Number(rows[0].total);
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  excluir,
  contarTodos
};