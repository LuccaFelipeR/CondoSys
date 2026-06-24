const ReservaModel = require('../models/reservaModel');
const MoradorModel = require('../models/moradorModel');

const usuarioPadrao = {
  nome: 'Administrador Geral',
  email: 'admin@condosys.com.br',
  telefone: '(43) 9 9900-0001',
  tipo: 'Administrador',
  cadastradoEm: '01/01/2024'
};


exports.listarReservas = async (req, res) => {
  try {
    const [reservas, moradores] = await Promise.all([
      ReservaModel.listarTodos(),
      MoradorModel.listarTodos()
    ]);
    res.render('reservas/index', {
      reservas,
      moradores,
      titulo: 'Reservas',
      usuario: req.session.usuario || usuarioPadrao,
      erro: null,
      dadosFormulario: null,
      abrirModal: null
    });
  } catch (erro) {
    res.render('reservas/index', {
      reservas: [],
      moradores: [],
      titulo: 'Reservas',
      usuario: req.session.usuario || usuarioPadrao,
      erro: 'Erro ao carregar reservas.',
      dadosFormulario: null,
      abrirModal: null
    });
  }
};


exports.formNovaReserva = async (req, res) => {
  try {
    const [reservas, moradores] = await Promise.all([
      ReservaModel.listarTodos(),
      MoradorModel.listarTodos()
    ]);
    res.render('reservas/index', {
      reservas,
      moradores,
      titulo: 'Reservas',
      usuario: req.session.usuario || usuarioPadrao,
      erro: null,
      dadosFormulario: null,
      abrirModal: 'cadastro'
    });
  } catch (erro) {
    res.redirect('/reservas');
  }
};

exports.salvarReserva = async (req, res) => {
  const { area, morador, data, horario, status } = req.body;
  try {
    await ReservaModel.cadastrar({ area, morador, data, horario, status });
    res.redirect('/reservas');
  } catch (erro) {
    const [reservas, moradores] = await Promise.all([
      ReservaModel.listarTodos(),
      MoradorModel.listarTodos()
    ]);
    res.render('reservas/index', {
      reservas,
      moradores,
      titulo: 'Reservas',
      usuario: req.session.usuario || usuarioPadrao,
      dadosFormulario: { area, morador, data, horario, status },
      erro: erro.message,
      abrirModal: 'cadastro'
    });
  }
};

exports.formEditarReserva = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [reserva, reservas, moradores] = await Promise.all([
      ReservaModel.buscarPorId(id),
      ReservaModel.listarTodos(),
      MoradorModel.listarTodos()
    ]);

    if (!reserva) {
      return res.redirect('/reservas');
    }

    res.render('reservas/index', {
      reservas,
      moradores,
      reserva,
      titulo: 'Reservas',
      usuario: req.session.usuario || usuarioPadrao,
      erro: null,
      dadosFormulario: null,
      abrirModal: 'edicao'
    });
  } catch (erro) {
    res.redirect('/reservas');
  }
};


exports.atualizarReserva = async (req, res) => {
  const id = parseInt(req.params.id);
  const { area, morador, data, horario, status } = req.body;
  try {
    await ReservaModel.atualizar(id, { area, morador, data, horario, status });
    res.redirect('/reservas');
  } catch (erro) {
    const [reservas, moradores] = await Promise.all([
      ReservaModel.listarTodos(),
      MoradorModel.listarTodos()
    ]);
    res.render('reservas/index', {
      reservas,
      moradores,
      titulo: 'Reservas',
      usuario: req.session.usuario || usuarioPadrao,
      reserva: { id, area, morador, data, horario, status },
      erro: erro.message,
      abrirModal: 'edicao'
    });
  }
};


exports.excluirReserva = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await ReservaModel.excluir(id);
    res.redirect('/reservas');
  } catch (erro) {
    res.redirect('/reservas');
    res.status(500).send('Erro ao excluir reserva: ' + erro.message);

  }
};