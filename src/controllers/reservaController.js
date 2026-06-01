

exports.listarReservas = (req, res) => {
    res.send("Lista de Reservas");
};

exports.formNovaReserva = (req, res) => {
    res.send("Formulário Nova Reserva");
};

exports.salvarReserva = (req, res) => {
    res.send("Reserva salva");
};

exports.formEditarReserva = (req, res) => {
    const id = req.params.id;

    res.send(`Editar reserva ${id}`);
};

exports.atualizarReserva = (req, res) => {
    const id = req.params.id;

    res.send(`Reserva ${id} atualizada`);
};

exports.excluirReserva = (req, res) => {
    const id = req.params.id;

    res.send(`Reserva ${id} excluída`);
};