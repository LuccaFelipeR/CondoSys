const moradores = [
  {
    id: 1,
    nome: 'Ana Lima',
    cpf: '123.456.789-00',
    unidade: 'Apto 101',
    telefone: '(43) 99999-0001',
    email: 'ana@email.com',
    status: 'Ativo'
  },
  {
    id: 2,
    nome: 'Carlos Mendes',
    cpf: '234.567.890-11',
    unidade: 'Apto 202',
    telefone: '(43) 99999-0002',
    email: 'carlos@email.com',
    status: 'Ativo'
  },
  {
    id: 3,
    nome: 'Beatriz Souza',
    cpf: '345.678.901-22',
    unidade: 'Apto 303',
    telefone: '(43) 99999-0003',
    email: 'beatriz@email.com',
    status: 'Inativo'
  },
  {
    id: 4,
    nome: 'Daniel Costa',
    cpf: '456.789.012-33',
    unidade: 'Apto 104',
    telefone: '(43) 99999-0004',
    email: 'daniel@email.com',
    status: 'Ativo'
  },
  {
    id: 5,
    nome: 'Elaine Ferreira',
    cpf: '567.890.123-44',
    unidade: 'Apto 205',
    telefone: '(43) 99999-0005',
    email: 'elaine@email.com',
    status: 'Ativo'
  }
];

function listarTodos() {
  return moradores;
}

function buscarPorId(id) {
  return moradores.find(morador => morador.id === Number(id));
}

function gerarNovoId() {
  if (moradores.length === 0) {
    return 1;
  }

  const maiorId = Math.max(...moradores.map(morador => morador.id));
  return maiorId + 1;
}

function criar(dados) {
  const novoMorador = {
    id: gerarNovoId(),
    ...dados,
    status: dados.status || 'Ativo'
  };

  moradores.push(novoMorador);

  return novoMorador;
}

function atualizar(id, dados) {
  const morador = buscarPorId(id);

  if (!morador) {
    return null;
  }

  morador.nome = dados.nome;
  morador.cpf = dados.cpf;
  morador.email = dados.email;
  morador.telefone = dados.telefone;
  morador.unidade = dados.unidade;
  morador.dataNascimento = dados.dataNascimento;
  morador.modeloVeiculo = dados.modeloVeiculo;
  morador.placa = dados.placa;
  morador.cor = dados.cor;
  morador.vaga = dados.vaga;
  morador.observacoes = dados.observacoes;

  return morador;
}

function inativar(id) {
  const morador = buscarPorId(id);

  if (!morador) {
    return null;
  }

  morador.status = 'Inativo';

  return morador;
}

function reativar(id) {
  const morador = buscarPorId(id);

  if (!morador) {
    return null;
  }

  morador.status = 'Ativo';

  return morador;
}

function contarTodos() {
  return moradores.length;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  inativar,
  reativar,
  contarTodos
};