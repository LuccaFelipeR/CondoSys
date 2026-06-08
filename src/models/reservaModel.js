const reservas = [
  {
    id: 1,
    area: 'Salão de festas',
    status: 'Solicitada'
  },
  {
    id: 2,
    area: 'Churrasqueira',
    status: 'Confirmada'
  }
];

function contarTodos() {
  return reservas.length;
}

module.exports = {
  contarTodos
};