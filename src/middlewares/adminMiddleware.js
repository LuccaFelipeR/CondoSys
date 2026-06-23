const jwt = require('jsonwebtoken');

// Chave secreta para assinar os tokens — guarda isso num .env em produção
const SECRET = 'condosys@secret2024';

// Gera um token JWT com os dados do usuário
function criaToken(usuario) {
  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo },
    SECRET,
    { expiresIn: '8h' }
  );
  return token;
}

// Middleware que protege as rotas — verifica se o token é válido
function validar(req, res, next) {
  // Aceita token tanto do header quanto da sessão
  const tokenHeader = req.headers['authorization'];
  const tokenSessao = req.session?.token;
  const token = tokenHeader || tokenSessao;

  if (!token) {
    return res.redirect('/login');
  }

  // Remove o "Bearer " se vier no header
  const tokenLimpo = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

  jwt.verify(tokenLimpo, SECRET, (err, decoded) => {
    if (err) {
      return res.redirect('/login');
    }
    // Salva os dados do usuário para as rotas usarem
    req.usuario = decoded;
    next();
  });
}

module.exports = { criaToken, validar };