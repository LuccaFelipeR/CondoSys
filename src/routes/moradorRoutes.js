const express = require('express');
const router = express.Router();

const moradorController = require('../controllers/moradorController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', moradorController.index);

router.post('/novo', moradorController.store);

router.post('/:id/editar', moradorController.edit);

router.post('/:id/inativar', moradorController.inativar);

module.exports = router;