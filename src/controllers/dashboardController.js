function index(req, res) {
  const totais = {
    moradores: 0,
    unidades: 0,
    reservas: 0,
    ocorrencias: 0,
    funcionarios: 0
  };

  res.render('dashboard/index', {
    titulo: 'Dashboard',
    totais,
    usuario: req.session.usuario
  });
}

module.exports = {
  index
};