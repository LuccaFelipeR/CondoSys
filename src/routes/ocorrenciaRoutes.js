const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrenciaController');

router.get('/', ocorrenciaController.listarOcorrencias);
router.post('/', ocorrenciaController.salvarOcorrencia);
router.post('/:id/editar', ocorrenciaController.editarOcorrencia);
router.post('/:id/excluir', ocorrenciaController.excluirOcorrencia);

module.exports = router;
