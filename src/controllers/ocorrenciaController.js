const ocorrenciaModel = require('../models/ocorrenciaModel');

class OcorrenciaController {
  listarOcorrencias(req, res) {
    res.render('ocorrencias/index', {
      titulo: 'Ocorrências',
      ocorrencias: ocorrenciaModel.listarTodos(),
      usuario: req.session.usuario
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
