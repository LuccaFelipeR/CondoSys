const { buscaUnidades } = require('../DAO/unidadesDAO');
const UnidadeModel = require('../models/unidadeModel');

exports.listarUnidades = async (req, res) => {
    try {
        const unidades = await buscaUnidades();
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
    } catch (erro) {
        console.error('Erro ao listar unidades:', erro);
        res.status(500).send('Erro ao carregar unidades.');
    }
};

exports.salvarUnidade = async (req, res) => {
    try {
        const novaUnidade = {
            bloco: req.body.bloco,
            numero: req.body.numero,
            andar: Number(req.body.andar),
            status: req.body.status || 'Ativa'
        };
        await UnidadeModel.cadastrar(novaUnidade);
        res.redirect('/unidades');
    } catch (erro) {
        console.error('Erro ao salvar unidade:', erro);
        res.status(500).send('Erro ao salvar unidade.');
    }
};

exports.atualizarUnidade = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const unidadeAtualizada = {
            bloco: req.body.bloco,
            numero: req.body.numero,
            andar: Number(req.body.andar),
            status: req.body.status
        };
        const unidade = await UnidadeModel.atualizar(id, unidadeAtualizada);
        if (!unidade) return res.status(404).send('Unidade não encontrada.');
        res.redirect('/unidades');
    } catch (erro) {
        console.error('Erro ao atualizar unidade:', erro);
        res.status(500).send('Erro ao atualizar unidade.');
    }
};

exports.excluirUnidade = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const unidade = await UnidadeModel.inativar(id);
        if (!unidade) return res.status(404).send('Unidade não encontrada.');
        res.redirect('/unidades');
    } catch (erro) {
        console.error('Erro ao inativar unidade:', erro);
        res.status(500).send('Erro ao inativar unidade.');
    }
};