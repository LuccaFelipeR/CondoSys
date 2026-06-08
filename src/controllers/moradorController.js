const moradorModel = require('../models/moradorModel');

function obterUsuarioLogado(req) {
  return req.session.usuario || {
    id: 1,
    nome: 'Administrador Geral',
    email: 'admin@condosys.com.br',
    telefone: '(43) 9 9900-0001',
    tipo: 'Administrador',
    cadastradoEm: '01/01/2024'
  };
}

class MoradorController {
  index(req, res) {
    res.render('moradores/index', {
      titulo: 'Moradores',
      moradores: moradorModel.listarTodos(),
      usuario: obterUsuarioLogado(req)
    });
  }

  store(req, res) {
    const { nome } = req.body;

    const regexNomeValido = /^[a-zA-ZÀ-ÿ\s]+$/;

    if (!nome || !regexNomeValido.test(nome)) {
      return res.status(400).send('Erro de Validação: o nome deve conter apenas letras e espaços.');
    }

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
    const morador = moradorModel.atualizar(
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

    if (!morador) {
      return res.status(404).send('Morador não encontrado.');
    }

    res.redirect('/moradores');
  }

  inativar(req, res) {
    const morador = moradorModel.inativar(req.params.id);

    if (!morador) {
      return res.status(404).send('Morador não encontrado.');
    }

    res.redirect('/moradores');
  }

  reativar(req, res) {
    const morador = moradorModel.reativar(req.params.id);

    if (!morador) {
      return res.status(404).send('Morador não encontrado.');
    }

    res.redirect('/moradores');
  }
}

module.exports = new MoradorController();