const database = require('../config/database');

async function buscarReserva(){
    const query = 'Select * FROM reservas';
    const result = await database.query(query);
    return result.rows;
}

async function editarReversa(reservas){
    const query = 'UPDATE reservas SET area_comum = $1, data_reserva = $2, horario_inicio = $3, horario_fim = $4, status = $5 WHERE id = $6';

    const values = [reservas.area_comum, reservas.data_reserva, reservas.horario_inicio, reservas.horario_fim, reservas.status, reservas.id_reserva];
    const result = await database.query(query, values); 
    return result.rowCount;

}

module.exports = {buscarReserva, editarReversa};