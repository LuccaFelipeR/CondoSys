function listar(req, res) {
    res.render('funcionarios/index', {
        titulo: 'Funcionários',
    });
    }


module.exports = {
    listar,
};

//por enquanto nao tem banco ainda. entao é proposital, to testando se a rota, o controller e a view conversam entre si. depois a gente implementa o banco e a logica de negocio. por isso tem so um render, sem nada de logica.
