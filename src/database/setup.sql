const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
//monta o caminho dos arquivos mais seguros


const CONFIG = {
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    port: 5432
};

const NOME_BANCO = 'condoServer';

async function setup() {

    // Conecta no banco postgres
    const clientAdmin = new Client({ ...CONFIG, database: 'postgres' });

    try {
        await clientAdmin.connect();
        console.log('✅ Conectado ao PostgreSQL.');

        // Verifica se o banco já existe
        const resultado = await clientAdmin.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [NOME_BANCO]
        );

        if (resultado.rowCount === 0) {
            await clientAdmin.query(`CREATE DATABASE "${NOME_BANCO}"`);
            console.log(`✅ Banco "${NOME_BANCO}" criado.`);
        } else {
            console.log(`ℹ️  Banco "${NOME_BANCO}" já existe.`);
        }

    } finally {
        await clientAdmin.end();
    }

    //Conecta no condoServer para rodar schema e seed
    const clientBanco = new Client({ ...CONFIG, database: NOME_BANCO });

    try {
        await clientBanco.connect();
        console.log(`✅ Conectado ao banco "${NOME_BANCO}".`);

        
        const schemaSql = fs.readFileSync(
            path.join(__dirname, 'schema.sql'),
            'utf8'
        );
        await clientBanco.query(schemaSql);
        console.log('✅ Tabelas criadas (schema.sql).');

        
        const seedSql = fs.readFileSync(
            path.join(__dirname, 'seed.sql'),
            'utf8'
        );
        await clientBanco.query(seedSql);
        console.log('✅ Dados iniciais inseridos (seed.sql).');

        console.log('\n🚀 Setup concluído! Rode: npm run dev\n');

    } finally {
        await clientBanco.end();
    }
}

setup().catch(err => {
    console.error('❌ Erro no setup:', err.message);
    process.exit(1);
});