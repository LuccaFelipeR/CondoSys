const UnidadeModel = require('../models/unidadeModel');

exports.listarUnidades = (req, res) => {
  const unidades = UnidadeModel.listarTodos();

  res.render('unidades/index', {
    titulo: 'Unidades',
    usuario: req.session.usuario || {
      nome: 'Administrador Geral',
      email: 'admin@condosys.com.br',
      telefone: '(43) 9 9900-0001',
      tipo: 'Administrador',
      cadastradoEm: '01/01/2024'
    },
    unidades
  });
};

exports.salvarUnidade = (req, res) => {
    const novaUnidade = {
        bloco: req.body.bloco,
        numero: req.body.numero,
        andar: Number(req.body.andar),
        status: req.body.status || 'Ativa'
    };

    UnidadeModel.cadastrar(novaUnidade);

    res.redirect('/unidades');
};

exports.atualizarUnidade = (req, res) => {
    const id = Number(req.params.id);

    const unidadeAtualizada = {
        bloco: req.body.bloco,
        numero: req.body.numero,
        andar: Number(req.body.andar),
        status: req.body.status
    };

    const unidade = UnidadeModel.atualizar(
        id,
        unidadeAtualizada
    );

    if (!unidade) {
        return res.status(404).send('Unidade não encontrada.');
    }

    res.redirect('/unidades');
};

exports.excluirUnidade = (req, res) => {
    const id = Number(req.params.id);

    const unidade = UnidadeModel.inativar(id);

    if (!unidade) {
        return res.status(404).send('Unidade não encontrada.');
    }

    res.redirect('/unidades');
};