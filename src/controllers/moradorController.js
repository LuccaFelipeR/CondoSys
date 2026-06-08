const moradorModel =
  require('../models/moradorModel');

class MoradorController {

  index(req, res) {

    res.render('moradores/index', {
      titulo: 'Moradores',
      moradores: moradorModel.listarTodos(),
      usuario: req.session.usuario
    });

  }

  store(req, res) {

    moradorModel.criar({
      nome: req.body.nome,
      cpf: req.body.cpf,
      email: req.body.email,
      telefone: req.body.telefone,
      unidade: req.body.unidade,
      dataNascimento: req.body.dataNascimento,
      modeloVeiculo: req.body.modeloVeiculo,
      placa: req.body.placa,
      cor: req.body.cor,
      vaga: req.body.vaga,
      observacoes: req.body.observacoes
    });

    res.redirect('/moradores');
  }

  edit(req, res) {

    moradorModel.atualizar(
      req.params.id,
      {
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        telefone: req.body.telefone,
        unidade: req.body.unidade,
        dataNascimento: req.body.dataNascimento,
        modeloVeiculo: req.body.modeloVeiculo,
        placa: req.body.placa,
        cor: req.body.cor,
        vaga: req.body.vaga,
        observacoes: req.body.observacoes
      }
    );

    res.redirect('/moradores');
  }

  inativar(req, res) {

    moradorModel.inativar(
      req.params.id
    );

    res.redirect('/moradores');
  }

}

module.exports =
  new MoradorController();