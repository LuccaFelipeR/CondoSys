const express = require('express');
const router = express.Router();

const moradorController = require('../controllers/moradorController');

router.get('/', moradorController.index);

module.exports = router;