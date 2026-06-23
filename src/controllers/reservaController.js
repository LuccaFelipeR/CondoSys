const ReservaModel = require('../models/reservaModel');


const usuarioPadrao = {
  nome: 'Administrador Geral',
  email: 'admin@condosys.com.br',
  telefone: '(43) 9 9900-0001',
  tipo: 'Administrador',
  cadastradoEm: '01/01/2024'
};


exports.listarReservas = async (req, res) => {
  try {
    const reservas = await ReservaModel.listarTodos();
    res.render('reservas/index', {
      reservas,
      titulo: 'Reservas',
      usuario: req.session.usuario || usuarioPadrao
    });
  } catch (erro) {
    res.status(500).send('Erro ao carregar reservas: ' + erro.message);
  }
};

exports.formNovaReserva = async (req, res) => {
  try {
    const reservas = await ReservaModel.listarTodos();
    res.render('reservas/index', {
      reservas,
      titulo: 'Reservas',
      usuario: req.session.usuario || usuarioPadrao
    });
  } catch (erro) {
    res.status(500).send('Erro ao carregar formulário: ' + erro.message);
  }
};


exports.salvarReserva = async (req, res) => {
  try {
    const { area, morador, data, horario, status } = req.body;
    await ReservaModel.cadastrar({ area, morador, data, horario, status });
    res.redirect('/reservas');
  } catch (erro) {
    res.status(400).send('Erro ao salvar reserva: ' + erro.message);
  }
};


exports.formEditarReserva = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const reserva = await ReservaModel.buscarPorId(id);

    if (!reserva) {
      return res.status(404).send('Reserva não encontrada!');
    }

    const reservas = await ReservaModel.listarTodos();
    res.render('reservas/index', {
      reservas,
      reserva,
      titulo: 'Reservas',
      usuario: req.session.usuario || usuarioPadrao
    });
  } catch (erro) {
    res.status(500).send('Erro ao carregar reserva: ' + erro.message);
  }
};


exports.atualizarReserva = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { area, morador, data, horario, status } = req.body;
    await ReservaModel.atualizar(id, { area, morador, data, horario, status });
    res.redirect('/reservas');
  } catch (erro) {
   
    const status = erro.message.includes('não encontrada') ? 404 : 400;
    res.status(status).send('Erro ao atualizar reserva: ' + erro.message);
  }
};


exports.excluirReserva = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const excluiu = await ReservaModel.excluir(id);

    if (!excluiu) {
      return res.status(404).send('Reserva não encontrada');
    }

    res.redirect('/reservas');
  } catch (erro) {
    res.status(500).send('Erro ao excluir reserva: ' + erro.message);
  }
};