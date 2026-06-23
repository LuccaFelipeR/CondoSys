<<<<<<< feat/jwt-autenticacao
const { criaToken } = require('../middlewares/adminMiddleware');

class AuthController {
=======
// Classe responsável pelas regras de autenticação

class AuthController {

>>>>>>> main
  loginPage(req, res) {
    res.render('auth/login');
  }

  login(req, res) {
    const { email, password } = req.body || {};

    if (email === 'admin@condosys.com' && password === '12345') {
<<<<<<< feat/jwt-autenticacao
      const usuario = {
        id: 1,
        nome: 'Administrador Geral',
        email: 'admin@condosys.com.br',
        telefone: '(43) 9 9900-0001',
        tipo: 'Administrador',
        cadastradoEm: '01/01/2024'
      };

      // Gera o token JWT e salva na sessão
      const token = criaToken(usuario);
      //console.log('Token gerado:', token); testando o token
      req.session.token = token;
      req.session.usuario = usuario;
=======

      req.session.usuario = {
        id: 1,
        nome: 'Administrador Geral',
        email: 'admin@condosys.com.br',
        telefone: '(43) 9 9900-0001',
        tipo: 'Administrador',
        cadastradoEm: '01/01/2024'
      };
>>>>>>> main

      req.session.save((err) => {
        if (err) {
          console.log('Erro ao salvar sessão:', err);
          return res.send('Erro interno no servidor');
        }
<<<<<<< feat/jwt-autenticacao
        return res.redirect('/dashboard');
      });
=======

        return res.redirect('/dashboard');
      });

>>>>>>> main
    } else {
      console.log('Falha na validação das credenciais.');
      return res.send('Usuário ou senha inválidos');
    }
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
}

module.exports = new AuthController();