const { validar } = require('./adminMiddleware');

function authMiddleware(req, res, next) {
  if (!req.session.usuario) {
    console.log('Acesso negado! Redirecionando para login...');
    return res.redirect('/login');
  }
  console.log('Usuário autenticado:', req.session.usuario.nome);
  validar(req, res, next);
}

module.exports = authMiddleware;