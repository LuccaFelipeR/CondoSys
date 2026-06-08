const express = require('express');
const router = express.Router();

const funcionarioController = require('../controllers/funcionarioController');

router.get('/', funcionarioController.listar);
router.post('/', funcionarioController.cadastrar);
router.post('/:id/editar', funcionarioController.editar);
router.post('/:id/inativar', funcionarioController.inativar);
router.post('/:id/reativar', funcionarioController.reativar);

module.exports = router;