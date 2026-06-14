const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', usuarioController.perfil);


router.get('/perfil', usuarioController.perfil);

module.exports = router;