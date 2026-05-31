const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('dashboard/index', {
    usuario: req.session.usuario || { nome: 'Admin' }
  });
});

module.exports = router;