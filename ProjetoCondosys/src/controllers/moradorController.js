const Morador = require('../models/moradorModel');
const Unidade = require('../models/unidadeModel');

function obterUsuarioLogado(req) {
  return req.session.usuario || {
    id_usuario: 1,
    nome: 'Administrador Geral'
  };
}

class MoradorController {

  async index(req, res) {
    try {
      
      const moradores = await Morador.listarTodos(); 
      
      
      const unidades = await Unidade.listarTodos();

      res.render('moradores/index', {
        titulo: 'Moradores',
        moradores, 
        unidades,  
        usuario: obterUsuarioLogado(req)
      });

    } catch (erro) {
      console.error(erro);
      res.status(500).send('Erro ao carregar moradores');
    }
  }

  async store(req, res) {
    try {
      await Morador.criar({
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        email: req.body.email,
        dataNascimento: req.body.dataNascimento,
        placa: req.body.placa,
        modeloVeiculo: req.body.modeloVeiculo,

        // temporário
        id_unidade: req.body.id_unidade,
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
      await Morador.atualizar(
        req.params.id,
        {
          nome: req.body.nome,
          cpf: req.body.cpf,
          telefone: req.body.telefone,
          email: req.body.email,
          dataNascimento: req.body.dataNascimento,
          placa: req.body.placa,
          modeloVeiculo: req.body.modeloVeiculo,
          id_unidade: req.body.id_unidade
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
      await Morador.inativar(req.params.id);
      res.redirect('/moradores');
    } catch (erro) {
      console.error(erro);
      res.status(500).send('Erro ao inativar');
    }
  }

  async reativar(req, res) {
    try {
      await Morador.reativar(req.params.id);
      res.redirect('/moradores');
    } catch (erro) {
      console.error(erro);
      res.status(500).send('Erro ao reativar');
    }
  }

}

module.exports = new MoradorController();