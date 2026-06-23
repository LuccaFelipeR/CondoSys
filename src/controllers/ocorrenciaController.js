const ocorrenciaModel = require('../models/ocorrenciaModel');

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

class OcorrenciaController {
  listarOcorrencias(req, res) {
    res.render('ocorrencias/index', {
  titulo: 'Ocorrências',
  ocorrencias: ocorrenciaModel.listarTodos(),
  usuario: obterUsuarioLogado(req)
});
  }

  salvarOcorrencia(req, res) {
    const { titulo, descricao, morador, unidade, data, status } = req.body;
    ocorrenciaModel.criar({
      titulo,
      descricao,
      morador,
      unidade,
      data,
      status
    });
    res.redirect('/ocorrencias');
  }

  editarOcorrencia(req, res) {
    const id = req.params.id;
    const { titulo, descricao, morador, unidade, data, status } = req.body;
    ocorrenciaModel.atualizar(id, {
      titulo,
      descricao,
      morador,
      unidade,
      data,
      status
    });
    res.redirect('/ocorrencias');
  }
}

module.exports = new OcorrenciaController();
