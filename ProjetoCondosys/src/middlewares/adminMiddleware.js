const jwt = require('jsonwebtoken');


const SECRET = 'condosys@secret2024';


function criaToken(usuario) {
  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo },
    SECRET,
    { expiresIn: '8h' }
  );
  return token;
}


function validar(req, res, next) {
  const tokenHeader = req.headers['authorization'];
  const tokenSessao = req.session?.token;
  const token = tokenHeader || tokenSessao;

  if (!token) {i
    return res.redirect('/login');
  }


  const tokenLimpo = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

  jwt.verify(tokenLimpo, SECRET, (err, decoded) => {
    if (err) {
      return res.redirect('/login');
    }

    req.usuario = decoded;
    next();
  });
}

module.exports = { criaToken, validar };