const express = require('express');
const router = express.Router();

const moradorController = require('../controllers/moradorController');

router.get('/', moradorController.index);
router.post('/novo', moradorController.store);
router.get('/excluir/:id', moradorController.delete);

module.exports = router;