const moradores = [
  {
    id: 1,
    nome: 'Ana Lima',
    status: 'Ativo'
  },
  {
    id: 2,
    nome: 'Carlos Mendes',
    status: 'Ativo'
  },
  {
    id: 3,
    nome: 'Beatriz Souza',
    status: 'Inativo'
  },
  {
    id: 4,
    nome: 'Daniel Costa',
    status: 'Ativo'
  },
  {
    id: 5,
    nome: 'Elaine Ferreira',
    status: 'Ativo'
  }
];

function contarTodos() {
  return moradores.length;
}

module.exports = {
  contarTodos
};