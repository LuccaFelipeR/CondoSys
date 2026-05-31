function listar(req, res) {
    res.render('funcionarios/index', {
        titulo: 'Funcionários',
    });
    }


module.exports = {
    listar,
};

//por enquanto nao tem banco ainda. entao é proposital, to testando se a rota, o controller e a view conversam entre si. depois a gente implementa o banco e a logica de negocio. por isso tem so um render, sem nada de logica.

function listar(req, res) {
    const funcionarios = [
    {
    id: 1,
    nome: 'Carlos Henrique',
    cpf: '123.456.789-00',
    cargo: 'Porteiro',
    telefone: '(43) 9 9999-1001',
    dataAdmissao: '10/03/2024',
    status: 'Ativo'
    },
    {
    id: 2,
    nome: 'Marina Souza',
    cpf: '234.567.890-11',
    cargo: 'Zeladora',
    telefone: '(43) 9 9999-1002',
    dataAdmissao: '15/08/2023',
    status: 'Ativo'
    },
    {
    id: 3,
    nome: 'Roberto Lima',
    cpf: '345.678.901-22',
    cargo: 'Manutenção',
    telefone: '(43) 9 9999-1003',
    dataAdmissao: '20/11/2022',
    status: 'Inativo'
    },
    {
    id: 4,
    nome: 'Fernanda Alves',
    cpf: '456.789.012-33',
    cargo: 'Síndica',
    telefone: '(43) 9 9999-1004',
    dataAdmissao: '05/01/2024',
    status: 'Ativo'
    },
    {
    id: 5,
    nome: 'João Pereira',
    cpf: '567.890.123-44',
    cargo: 'Vigia',
    telefone: '(43) 9 9999-1005',
    dataAdmissao: '18/06/2023',
    status: 'Ativo'
    }
];

res.render('funcionarios/index', {
    titulo: 'Painel de Controle',
    funcionarios
    });
}

module.exports = {
    listar,
};