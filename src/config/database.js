const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'projeto_ecosys',
    port: 5444 //pegar a porta padrao do postgre
});

module.exports = pool;//exporta a pool já conectada para outros arquivos usarem