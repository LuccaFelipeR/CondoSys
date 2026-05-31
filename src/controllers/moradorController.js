class MoradorController {
  index(req, res) {
    const moradoresFake = [
      {
        id: 1,
        nome: 'Ana Lima',
        cpf: '123.456.789-00',
        unidade: 'Apto 101',
        telefone: '(43) 9 9999-0001',
        email: 'ana@email.com',
        status: 'Ativo'
      },
      {
        id: 2,
        nome: 'Carlos Mendes',
        cpf: '234.567.890-11',
        unidade: 'Apto 202',
        telefone: '(43) 9 9999-0002',
        email: 'carlos@email.com',
        status: 'Ativo'
      },
      {
        id: 3,
        nome: 'Beatriz Souza',
        cpf: '345.678.901-22',
        unidade: 'Apto 303',
        telefone: '(43) 9 9999-0003',
        email: 'bea@email.com',
        status: 'Inativo'
      },
      {
        id: 4,
        nome: 'Daniel Costa',
        cpf: '456.789.012-33',
        unidade: 'Apto 104',
        telefone: '(43) 9 9999-0004',
        email: 'daniel@email.com',
        status: 'Ativo'
      },
      {
        id: 5,
        nome: 'Elaine Ferreira',
        cpf: '567.890.123-44',
        unidade: 'Apto 205',
        telefone: '(43) 9 9999-0005',
        email: 'elaine@email.com',
        status: 'Ativo'
      }
    ];

    res.render('moradores/index', {
      titulo: 'Moradores',
      moradores: moradoresFake,
      usuario: req.session.usuario
    });
  }
}

module.exports = new MoradorController();