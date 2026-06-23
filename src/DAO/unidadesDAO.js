const db = require ('../database/connection');

async function buscaUnidades() {
    const query = 'select * from unidades';
    const result  = await db.query(query);
    return result.rows;
    
};

module.exports={buscaUnidades};