const pool = require('../database/connection');

async function listarTodos() {
    const result = await pool.query(
        'SELECT * FROM unidades ORDER BY id_unidade'
    );
    return result.rows;
}

async function contarTodos() {
    const result = await pool.query(
        'SELECT COUNT(*) FROM unidades'
    );
    return parseInt(result.rows[0].count);
}

async function cadastrar(unidade) {
    const { bloco, numero, andar, status } = unidade;
    const result = await pool.query(
        `INSERT INTO unidades (bloco, numero, andar, status)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [bloco, numero, andar, status]
    );
    return result.rows[0];
}

async function atualizar(id, dadosAtualizados) {
    const { bloco, numero, andar, status } = dadosAtualizados;
    const result = await pool.query(
        `UPDATE unidades
         SET bloco = $1, numero = $2, andar = $3, status = $4
         WHERE id_unidade = $5
         RETURNING *`,
        [bloco, numero, andar, status, id]
    );
    if (result.rowCount === 0) return null;
    return result.rows[0];
}

async function inativar(id) {
    const result = await pool.query(
        `UPDATE unidades
         SET status = 'Inativa'
         WHERE id_unidade = $1
         RETURNING *`,
        [id]
    );
    if (result.rowCount === 0) return null;
    return result.rows[0];
}

module.exports = {
    listarTodos,
    cadastrar,
    atualizar,
    inativar,
    contarTodos
};