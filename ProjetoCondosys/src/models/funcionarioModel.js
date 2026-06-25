const pool = require('../database/connection');

function formatarDataParaTela(data) {
  if (!data) {
    return '';
  }

  const dataObj = data instanceof Date ? data : new Date(data);

  if (Number.isNaN(dataObj.getTime())) {
    return '';
  }

  const dia = String(dataObj.getDate()).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

function formatarDataParaInput(data) {
  if (!data) {
    return '';
  }

  if (typeof data === 'string') {
    return data.slice(0, 10);
  }

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function mapearFuncionario(linha) {
  return {
    id: linha.id_funcionario,
    nome: linha.nome,
    cpf: linha.cpf,
    cargo: linha.cargo,
    telefone: linha.telefone,
    dataAdmissao: formatarDataParaTela(linha.data_admissao),
    dataAdmissaoInput: formatarDataParaInput(linha.data_admissao),
    salario: linha.salario,
    status: linha.status,
    idUsuario: linha.id_usuario
  };
}

async function listarTodos() {
  const resultado = await pool.query(`
    SELECT *
    FROM funcionarios
    ORDER BY id_funcionario
  `);

  return resultado.rows.map(mapearFuncionario);
}

async function cadastrar(novoFuncionario) {
  const {
    nome,
    cpf,
    cargo,
    telefone,
    dataAdmissao,
    salario,
    status,
    idUsuario
  } = novoFuncionario;

  const resultado = await pool.query(
    `
      INSERT INTO funcionarios
        (nome, cpf, cargo, telefone, data_admissao, salario, status, id_usuario)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,
    [
      nome,
      cpf,
      cargo,
      telefone,
      dataAdmissao,
      salario || 0,
      status || 'Ativo',
      idUsuario || 1
    ]
  );

  return mapearFuncionario(resultado.rows[0]);
}

async function buscarPorId(id) {
  const resultado = await pool.query(
    `
      SELECT *
      FROM funcionarios
      WHERE id_funcionario = $1
    `,
    [id]
  );

  if (resultado.rowCount === 0) {
    return null;
  }

  return mapearFuncionario(resultado.rows[0]);
}

async function buscarPorCpf(cpf) {
  const resultado = await pool.query(
    `
      SELECT *
      FROM funcionarios
      WHERE cpf = $1
    `,
    [cpf]
  );

  if (resultado.rowCount === 0) {
    return null;
  }

  return mapearFuncionario(resultado.rows[0]);
}

async function cpfJaExiste(cpf, idIgnorado = null) {
  let sql = `
    SELECT id_funcionario
    FROM funcionarios
    WHERE cpf = $1
  `;

  const parametros = [cpf];

  if (idIgnorado) {
    sql += ` AND id_funcionario <> $2`;
    parametros.push(Number(idIgnorado));
  }

  sql += ` LIMIT 1`;

  const resultado = await pool.query(sql, parametros);

  return resultado.rowCount > 0;
}

async function atualizar(id, dadosAtualizados) {
  const {
    nome,
    cpf,
    cargo,
    telefone,
    dataAdmissao,
    salario,
    status
  } = dadosAtualizados;

  const resultado = await pool.query(
    `
      UPDATE funcionarios
      SET
        nome = $1,
        cpf = $2,
        cargo = $3,
        telefone = $4,
        data_admissao = $5,
        salario = $6,
        status = $7
      WHERE id_funcionario = $8
      RETURNING *
    `,
    [
      nome,
      cpf,
      cargo,
      telefone,
      dataAdmissao,
      salario || 0,
      status || 'Ativo',
      id
    ]
  );

  if (resultado.rowCount === 0) {
    return null;
  }

  return mapearFuncionario(resultado.rows[0]);
}

async function inativar(id) {
  const resultado = await pool.query(
    `
      UPDATE funcionarios
      SET status = 'Inativo'
      WHERE id_funcionario = $1
      RETURNING *
    `,
    [id]
  );

  if (resultado.rowCount === 0) {
    return null;
  }

  return mapearFuncionario(resultado.rows[0]);
}

async function reativar(id) {
  const resultado = await pool.query(
    `
      UPDATE funcionarios
      SET status = 'Ativo'
      WHERE id_funcionario = $1
      RETURNING *
    `,
    [id]
  );

  if (resultado.rowCount === 0) {
    return null;
  }

  return mapearFuncionario(resultado.rows[0]);
}

async function contarTodos() {
  const resultado = await pool.query(`
    SELECT COUNT(*) FROM funcionarios
  `);

  return parseInt(resultado.rows[0].count, 10);
}

async function contarAtivos() {
  const resultado = await pool.query(`
    SELECT COUNT(*) FROM funcionarios
    WHERE status = 'Ativo'
  `);

  return parseInt(resultado.rows[0].count, 10);
}

async function contarInativos() {
  const resultado = await pool.query(`
    SELECT COUNT(*) FROM funcionarios
    WHERE status = 'Inativo'
  `);

  return parseInt(resultado.rows[0].count, 10);
}

module.exports = {
  listarTodos,
  cadastrar,
  buscarPorId,
  buscarPorCpf,
  cpfJaExiste,
  atualizar,
  inativar,
  reativar,
  contarTodos,
  contarAtivos,
  contarInativos
};