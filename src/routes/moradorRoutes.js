const express = require('express');
const router = express.Router();

const moradorController = require('../controllers/moradorController');

router.get('/', moradorController.index);

router.post('/novo', moradorController.store);

router.post('/:id/editar', moradorController.edit);

router.post('/:id/inativar', moradorController.inativar);

router.post('/:id/reativar', moradorController.reativar);

module.exports = router;