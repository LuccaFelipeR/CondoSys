const ReservaModel = require('../models/reservaModel');

exports.listarReservas = (req, res) => {
  const reservas = ReservaModel.listarTodos();

  res.render('reservas/index', { 
    reservas: reservas,
    titulo: 'Reservas',
    usuario: req.session.usuario || { nome: 'Admin' }
  });
};

exports.formNovaReserva = (req, res) => {
  const reservas = ReservaModel.listarTodos();

  res.render('reservas/index', {
    reservas: reservas, 
    titulo: 'Reservas',
    usuario: req.session.usuario || { nome: 'Admin' }
  });
};

exports.salvarReserva = (req, res) => {
  const { area, morador, data, horario, status } = req.body;

  ReservaModel.cadastrar({
    area,
    morador,
    data,
    horario,
    status
  });
  
  res.redirect('/reservas');
};

exports.formEditarReserva = (req, res) => {
  const id = parseInt(req.params.id);
  const reserva = ReservaModel.buscarPorId(id);

  if (!reserva) {
    return res.status(404).send('Reserva não encontrada!');
  }

  const reservas = ReservaModel.listarTodos();

  res.render('reservas/index', {
    reservas: reservas,
    reserva: reserva,
    titulo: 'Reservas',
    usuario: req.session.usuario || { nome: 'Admin' }
  });
};

exports.atualizarReserva = (req, res) => {
  const id = parseInt(req.params.id);

  const reserva = ReservaModel.buscarPorId(id);

  if (!reserva) {
    return res.status(404).send('Reserva não encontrada');
  }

  const { area, morador, data, horario, status } = req.body;

  ReservaModel.atualizar(id, {
    area,
    morador,
    data,
    horario,
    status
  });

  res.redirect('/reservas');
};

exports.excluirReserva = (req, res) => {
  const id = parseInt(req.params.id);

  const excluiu = ReservaModel.excluir(id);

  if (!excluiu) {
    return res.status(404).send('Reserva não encontrada');
  }

  res.redirect('/reservas');
};