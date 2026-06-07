function carregarModel(caminho) {
  try {
    return require(caminho);
  } catch (erro) {
    console.log(`Erro ao carregar model: ${caminho}`);
    console.log(erro.message);
    return null;
  }
}

const MoradorModel = carregarModel('../models/moradorModel');
const UnidadeModel = carregarModel('../models/unidadeModel');
const ReservaModel = carregarModel('../models/reservaModel');
const OcorrenciaModel = carregarModel('../models/ocorrenciaModel');
const FuncionarioModel = carregarModel('../models/funcionarioModel');

function contar(nome, model) {
  if (!model) {
    console.log(`${nome}: model não carregado.`);
    return 0;
  }

  if (typeof model.contarTodos !== 'function') {
    console.log(`${nome}: função contarTodos não existe.`);
    console.log('Funções exportadas:', Object.keys(model));
    return 0;
  }

  try {
    return model.contarTodos();
  } catch (erro) {
    console.log(`${nome}: erro ao executar contarTodos.`);
    console.log(erro.message);
    return 0;
  }
}

function index(req, res) {
  const totais = {
    moradores: contar('Moradores', MoradorModel),
    unidades: contar('Unidades', UnidadeModel),
    reservas: contar('Reservas', ReservaModel),
    ocorrencias: contar('Ocorrências', OcorrenciaModel),
    funcionarios: contar('Funcionários', FuncionarioModel)
  };

  const grafico = {
    labels: ['Moradores', 'Unidades', 'Reservas', 'Ocorrências', 'Funcionários'],
    valores: [
      totais.moradores,
      totais.unidades,
      totais.reservas,
      totais.ocorrencias,
      totais.funcionarios
    ]
  };

  res.render('dashboard/index', {
    titulo: 'Dashboard',
    totais,
    grafico,
    usuario: req.session.usuario
  });
}

module.exports = {
  index
};