const moradorModel = require('../models/moradorModel');

function obterUsuarioLogado(req) {
  return req.session.usuario || {
    id_usuario: 1,
    nome: 'Administrador Geral'
  };
}

class MoradorController {

  async index(req, res) {
    try {

      const moradores = await moradorModel.listarTodos();

      res.render('moradores/index', {
        titulo: 'Moradores',
        moradores,
        usuario: obterUsuarioLogado(req)
      });

    } catch (erro) {
      console.error(erro);
      res.status(500).send('Erro ao carregar moradores');
    }
  }

  async store(req, res) {
    try {

      await moradorModel.criar({
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        email: req.body.email,
        dataNascimento: req.body.dataNascimento,
        placa: req.body.placa,
        modeloVeiculo: req.body.modeloVeiculo,

        // temporário
        id_unidade: 1,
        id_usuario: 1
      });

      res.redirect('/moradores');

    } catch (erro) {
      console.error(erro);
      res.status(500).send(erro.message);
    }
  }

  async edit(req, res) {
    try {

      await moradorModel.atualizar(
        req.params.id,
        {
          nome: req.body.nome,
          cpf: req.body.cpf,
          telefone: req.body.telefone,
          email: req.body.email,
          dataNascimento: req.body.dataNascimento,
          placa: req.body.placa,
          modeloVeiculo: req.body.modeloVeiculo,
          id_unidade: 1
        }
      );

      res.redirect('/moradores');

    } catch (erro) {
      console.error(erro);
      res.status(500).send(erro.message);
    }
  }

  async inativar(req, res) {
    try {

      await moradorModel.inativar(req.params.id);

      res.redirect('/moradores');

    } catch (erro) {
      console.error(erro);
      res.status(500).send('Erro ao inativar');
    }
  }

  async reativar(req, res) {
    try {

      await moradorModel.reativar(req.params.id);

      res.redirect('/moradores');

    } catch (erro) {
      console.error(erro);
      res.status(500).send('Erro ao reativar');
    }
  }

}

module.exports = new MoradorController();