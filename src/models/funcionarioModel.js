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

function listarTodos() {
  return funcionarios;
}

function cadastrar(novoFuncionario) {
  const novoId = funcionarios.length > 0
    ? funcionarios[funcionarios.length - 1].id + 1
    : 1;

  const funcionario = {
    id: novoId,
    ...novoFuncionario
  };

  funcionarios.push(funcionario);

  return funcionario;
}

function buscarPorId(id) {
  return funcionarios.find(funcionario => funcionario.id === Number(id));
}

function atualizar(id, dadosAtualizados) {
  const funcionario = buscarPorId(id);

  if (!funcionario) {
    return null;
  }

  funcionario.nome = dadosAtualizados.nome;
  funcionario.cpf = dadosAtualizados.cpf;
  funcionario.cargo = dadosAtualizados.cargo;
  funcionario.telefone = dadosAtualizados.telefone;
  funcionario.dataAdmissao = dadosAtualizados.dataAdmissao;
  funcionario.status = dadosAtualizados.status;

  return funcionario;
}

function inativar(id) {
  const funcionario = buscarPorId(id);

  if (!funcionario) {
    return null;
  }

  funcionario.status = 'Inativo';

  return funcionario;
}

function contarTodos() {
  return funcionarios.length;
}

module.exports = {
  listarTodos,
  cadastrar,
  buscarPorId,
  atualizar,
  inativar,
  contarTodos
};