function obterUsuarioLogado(req) {
  return req.session.usuario || {
    id: 1,
    nome: 'Administrador Geral',
    email: 'admin@condosys.com.br',
    telefone: '(43) 9 9900-0001',
    tipo: 'Administrador',
    cadastradoEm: '01/01/2024'
  };
}

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

async function contar(nome, model) {
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
    return await model.contarTodos();
  } catch (erro) {
    console.log(`${nome}: erro ao executar contarTodos.`);
    console.log(erro.message);
    return 0;
  }
}

async function index(req, res) {
  const totais = {
    moradores: await contar('Moradores', MoradorModel),
    unidades: await contar('Unidades', UnidadeModel),
    reservas: await contar('Reservas', ReservaModel),
    ocorrencias: await contar('Ocorrências', OcorrenciaModel),
    funcionarios: await contar('Funcionários', FuncionarioModel)
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
    usuario: obterUsuarioLogado(req)
  });
}

module.exports = {
  index
};