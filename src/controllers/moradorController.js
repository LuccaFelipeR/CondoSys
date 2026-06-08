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

  async store(req, res) {
        try {
            const { nome } = req.body;

            // Trava de segurança: Regex exata que permite apenas letras e espaços
            const regexNomeValido = /^[a-zA-ZÀ-ÿ\s]+$/;

            if (!regexNomeValido.test(nome)) {
                // Se falhar na validação, bloqueia a gravação imediatamente
                console.warn("Tentativa de gravação com caracteres inválidos bloqueada.");
                return res.status(400).send("Erro de Validação: O nome inserido contém caracteres não permitidos.");
            }

            // Se passar na validação, segue com a gravação normal
            await moradorModel.criar(req.body);
            res.redirect('/moradores');
        } catch (error) {
            console.error("Erro ao salvar morador:", error);
            res.status(500).send("Erro ao cadastrar morador no banco de dados.");
        }
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