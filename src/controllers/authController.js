// Classe resposavel pelas regras de autentificação

class AuthController{
    
    // Exide a telade login
    loginPage(req, res){
        res.render('auth/login');
    }

    // Processa os dados enviados pelo formulário
    login(req, res){

        // Captura email e senha enviados pelo form
        const {email, password} = req.body ||{};
    

        // Validação simples (temporária)
        if(email === "admin@condosys.com" && password ==="12345"){

                // cria uma sessão para manter o usuario logado
            req.session.usuario = {
                nome: 'Abel',
                email: email
            };
            req.session.save((err) => {
        if (err) {
            console.log("Erro ao salvar sessão:", err);
            return res.send("Erro interno no servidor");
        }
        
        
        return res.redirect('/dashboard');
    });
    
    } else {
    // Se falhar a senha
    console.log("Falha na validação das credenciais.");
    return res.send('Usuário ou senha inválidos');
    };
}
    logout(req, res){
    req.session.destroy(() =>{
        res.redirect('/login');
    });
}
        
}

module.exports = new AuthController();