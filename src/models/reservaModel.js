const reservas = [];

function listarTodos() {
  return reservas;
}

function gerarNovoId() {
  if (reservas.length === 0) {
    return 1;
  }

  return reservas[reservas.length - 1].id + 1;
}

function cadastrar(dadosReserva) {
  const novaReserva = {
    id: gerarNovoId(),
    ...dadosReserva
  };

  reservas.push(novaReserva);

  return novaReserva;
}

function buscarPorId(id) {
  return reservas.find(reserva => reserva.id === Number(id));
}

function atualizar(id, dadosAtualizados) {
  const reserva = buscarPorId(id);

  if (!reserva) {
    return null;
  }

  reserva.area = dadosAtualizados.area;
  reserva.morador = dadosAtualizados.morador;
  reserva.data = dadosAtualizados.data;
  reserva.horario = dadosAtualizados.horario;
  reserva.status = dadosAtualizados.status;

  return reserva;
}

function excluir(id) {
  const index = reservas.findIndex(reserva => reserva.id === Number(id));

  if (index === -1) {
    return false;
  }

  reservas.splice(index, 1);

  return true;
}

function contarTodos() {
  return reservas.length;
}

module.exports = {
  listarTodos,
  cadastrar,
  buscarPorId,
  atualizar,
  excluir,
  contarTodos
};