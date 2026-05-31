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
  }
];

function listar(req, res) {
  res.render('funcionarios/index', {
    titulo: 'Funcionários',
    funcionarios,
    usuario: req.session.usuario
  });
}

function cadastrar(req, res) {
  const novoFuncionario = {
    id: funcionarios.length + 1,
    nome: req.body.nome,
    cpf: req.body.cpf,
    cargo: req.body.cargo,
    telefone: req.body.telefone,
    dataAdmissao: formatarDataParaTabela(req.body.dataAdmissao),
    status: req.body.status || 'Ativo'
  };

  funcionarios.push(novoFuncionario);

  res.redirect('/funcionarios');
}

function editar(req, res) {
  const id = Number(req.params.id);

  const funcionario = funcionarios.find(item => item.id === id);

  if (!funcionario) {
    return res.status(404).send('Funcionário não encontrado.');
  }

  funcionario.nome = req.body.nome;
  funcionario.cpf = req.body.cpf;
  funcionario.cargo = req.body.cargo;
  funcionario.telefone = req.body.telefone;
  funcionario.dataAdmissao = formatarDataParaTabela(req.body.dataAdmissao);
  funcionario.status = req.body.status || 'Ativo';

  res.redirect('/funcionarios');
}

function inativar(req, res) {
  const id = Number(req.params.id);

  const funcionario = funcionarios.find(item => item.id === id);

  if (!funcionario) {
    return res.status(404).send('Funcionário não encontrado.');
  }

  funcionario.status = 'Inativo';

  res.redirect('/funcionarios');
}

function formatarDataParaTabela(data) {
  if (!data) return '';

  if (data.includes('/')) return data;

  const partes = data.split('-');

  if (partes.length !== 3) return data;

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

module.exports = {
  listar,
  cadastrar,
  editar,
  inativar
};