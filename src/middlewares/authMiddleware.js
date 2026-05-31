function authMiddleware(req, res, next){
    // verificar se a sessão e se o usuário esta logado

    if(!req.session.usuario){
        return res.redirect('/login');
    }

    // se estiver logado o next permite que a requisicao siga para rota desejada
    next();
}
module.exports = authMiddleware;