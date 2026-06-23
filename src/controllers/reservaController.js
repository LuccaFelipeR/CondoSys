
const reservas = []

exports.listarReservas = (req, res) => {
  const reservas = ReservaModel.listarTodos();

  res.render('reservas/index', { 
    reservas: reservas,
    titulo: 'Reservas',
    usuario: req.session.usuario || {
  nome: 'Administrador Geral',
  email: 'admin@condosys.com.br',
  telefone: '(43) 9 9900-0001',
  tipo: 'Administrador',
  cadastradoEm: '01/01/2024'
}
  });
};

exports.formNovaReserva = (req, res) => {
  const reservas = ReservaModel.listarTodos();

  res.render('reservas/index', {
    reservas: reservas, 
    titulo: 'Reservas',
    usuario: req.session.usuario || {
  nome: 'Administrador Geral',
  email: 'admin@condosys.com.br',
  telefone: '(43) 9 9900-0001',
  tipo: 'Administrador',
  cadastradoEm: '01/01/2024'
}
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
    usuario: req.session.usuario || {
    nome: 'Administrador Geral',
    email: 'admin@condosys.com.br',
    telefone: '(43) 9 9900-0001',
    tipo: 'Administrador',
    cadastradoEm: '01/01/2024'
}
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