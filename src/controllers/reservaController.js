
const reservas = []

exports.listarReservas = (req, res) => {
    res.render('reservas/index', { 
        reservas: reservas,
        titulo: 'Reservas',
        usuario: { nome: 'Admin' }
    });
};

exports.formNovaReserva = (req, res) => {
    res.render('reservas/index', {
        reservas : reservas, 
        titulo: 'Reservas',
        usuario: {nome: 'Admin'}
    });
};

exports.salvarReserva = (req, res) => {
    const {area, morador, data, horario, status} = req.body;
    const novoId = reservas.length > 0 ? reservas[reservas.length -1].id + 1 :1;

    reservas.push({id: novoId, area, morador, data, horario, status});
    
    res.redirect('/reservas');
};

exports.formEditarReserva = (req, res) => {
    const id = parseInt(req.params.id);
    const reservas = reservas.find(r => r.id === id);
    if(!reserva) return res.status(404).send('Reseva não encontrada!');

    res.render("reserva/index",{
        reservas : reservas,
        titulo: 'reservas',
        usuario: {nome: 'Admin'}
    });
};



exports.atualizarReserva = (req, res) => {
    const id = parseInt(req.params.id);
    const reserva = reservas.find(r => r.id ===id);
    if(!reserva) return res.status(404).send('Reserva não encontrada');
    const {area, morador, data, horario, status} = req.body;
    reserva.area = area;
    reserva.morador = morador; 
    reserva.data = data;
    reserva.horario = horario;
    reserva.status = status;
    res.redirect('/reservas');
};

exports.excluirReserva = (req, res) => {
    const id = parseInt(req.params.id);
    const index = reservas.findIndex(r => r.id===id);
    if(index === -1) return res.status(404).send('Reserva não encontrada');

    reservas.splice(index, 1);

    res.redirect('/reservas');
};