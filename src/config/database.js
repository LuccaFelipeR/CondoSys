const db = require('./src/config/database');

db.connect((err) => {
    if (err) {
        console.log('Erro ao conectar');
    } else {
        console.log('Banco conectado');
    }
});