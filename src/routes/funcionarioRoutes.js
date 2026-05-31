
//aqui estou dizendo que Quando alguem acessar /funcionarios, quem vai responder é a fução listar do controller de fuincionarios.
const express = require('express');
const router = express.Router();

const funcionarioController = require('../controllers/funcionarioController');

router.get('/', funcionarioController.listar);

module.exports = router;