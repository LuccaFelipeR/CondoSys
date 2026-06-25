const { criaToken } = require('../middlewares/adminMiddleware');

class AuthController {
  loginPage(req, res) {
    res.render('auth/login');
  }

  login(req, res) {
    const { email, password } = req.body || {};

    if (email === 'admin@condosys.com' && password === '12345') {
      const usuario = {
        id: 1,
        nome: 'Administrador Geral',
        email: 'admin@condosys.com.br',
        telefone: '(43) 9 9900-0001',
        tipo: 'Administrador',
        cadastradoEm: '01/01/2024'
      };

     
      const token = criaToken(usuario);
      console.log('Token gerado:', token); //testando o token
      req.session.token = token;
      req.session.usuario = usuario;

      req.session.save((err) => {
        if (err) {
          console.log('Erro ao salvar sessão:', err);
          return res.send('Erro interno no servidor');
        }
        return res.redirect('/dashboard');
      });
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