const ocorrencias = [
  {
    id: 1,
    titulo: 'Lâmpada queimada',
    status: 'Aberta'
  },
  {
    id: 2,
    titulo: 'Vazamento na garagem',
    status: 'Em andamento'
  }
];

function contarTodos() {
  return ocorrencias.length;
}

module.exports = {
  contarTodos
};