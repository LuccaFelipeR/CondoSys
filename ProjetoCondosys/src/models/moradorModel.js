const pool = require('../database/connection');

async function listarTodos() {

  const resultado = await pool.query(`
    SELECT 
      m.*, 
      TO_CHAR(m.data_nascimento, 'YYYY-MM-DD') AS data_nascimento_formatada,
      CONCAT('Bloco ', u.bloco, ' - Apto ', u.numero) AS unidade_formatada
    FROM moradores m
    LEFT JOIN unidades u ON m.id_unidade = u.id_unidade
    ORDER BY m.id_morador
  `);

  return resultado.rows;
}

async function buscarPorId(id) {
  const resultado = await pool.query(
    'SELECT * FROM moradores WHERE id_morador = $1',
    [id]
  );

  return resultado.rows[0];
}

async function criar(dados) {
  const resultado = await pool.query(
    `
    INSERT INTO moradores
    (
      nome,
      cpf,
      telefone,
      email,
      data_nascimento,
      placa_carro,
      car_model,
      id_unidade,
      id_usuario,
      status
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,'Ativo')
    RETURNING *
    `,
    [
      dados.nome,
      dados.cpf,
      dados.telefone,
      dados.email,
      dados.dataNascimento,
      dados.placa,
      dados.modeloVeiculo,
      dados.id_unidade,
      dados.id_usuario
    ]
  );

  return resultado.rows[0];
}

async function atualizar(id, dados) {
  const resultado = await pool.query(
    `
    UPDATE moradores
    SET
      nome = $1,
      cpf = $2,
      telefone = $3,
      email = $4,
      data_nascimento = $5,
      placa_carro = $6,
      car_model = $7,
      id_unidade = $8
    WHERE id_morador = $9
    RETURNING *
    `,
    [
      dados.nome,
      dados.cpf,
      dados.telefone,
      dados.email,
      dados.dataNascimento,
      dados.placa,
      dados.modeloVeiculo,
      dados.id_unidade,
      id
    ]
  );

  return resultado.rows[0];
}

async function inativar(id) {
  const resultado = await pool.query(
    `
    UPDATE moradores
    SET status = 'Inativo'
    WHERE id_morador = $1
    RETURNING *
    `,
    [id]
  );

  return resultado.rows[0];
}

async function reativar(id) {
  const resultado = await pool.query(
    `
    UPDATE moradores
    SET status = 'Ativo'
    WHERE id_morador = $1
    RETURNING *
    `,
    [id]
  );

  return resultado.rows[0];
}

async function contarTodos() {
  const resultado = await pool.query(
    'SELECT COUNT(*) FROM moradores'
  );

  return Number(resultado.rows[0].count);
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  inativar,
  reativar,
  contarTodos
};