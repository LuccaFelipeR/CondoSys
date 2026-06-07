const unidades = [
  {
    id: 1,
    bloco: 'A',
    numero: '101',
    status: 'Ativa'
  },
  {
    id: 2,
    bloco: 'A',
    numero: '202',
    status: 'Ativa'
  },
  {
    id: 3,
    bloco: 'B',
    numero: '303',
    status: 'Ativa'
  }
];

function contarTodos() {
  return unidades.length;
}

module.exports = {
  contarTodos
};