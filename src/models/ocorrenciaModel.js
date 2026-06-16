const ocorrencias = [
  {
    id: 1,
    titulo: 'Vazamento na Garagem',
    descricao: 'Infiltração de água na vaga 12, bloco A.',
    morador: 'Ana Lima',
    unidade: 'Apto 101',
    data: '2026-06-01',
    status: 'Pendente'
  },
  {
    id: 2,
    titulo: 'Barulho Excessivo',
    descricao: 'Música extremamente alta após as 22:30 no apartamento do vizinho.',
    morador: 'Carlos Mendes',
    unidade: 'Apto 202',
    data: '2026-05-31',
    status: 'Em Andamento'
  },
  {
    id: 3,
    titulo: 'Lixo em Área Comum',
    descricao: 'Sacolas de lixo deixadas no corredor do 3º andar.',
    morador: 'Beatriz Souza',
    unidade: 'Apto 303',
    data: '2026-05-29',
    status: 'Resolvido'
  },
  {
    id: 4,
    titulo: 'Portão da Garagem Travado',
    descricao: 'O portão automático da garagem demorou a abrir e travou no meio.',
    morador: 'Daniel Costa',
    unidade: 'Apto 104',
    data: '2026-05-28',
    status: 'Resolvido'
  }
];

function listarTodos() {
  return ocorrencias;
}

function buscarPorId(id) {
  return ocorrencias.find(o => o.id === Number(id));
}

function gerarNovoId() {
  if (ocorrencias.length === 0) {
    return 1;
  }
  const maiorId = Math.max(...ocorrencias.map(o => o.id));
  return maiorId + 1;
}

function criar(dados) {
  const novaOcorrencia = {
    id: gerarNovoId(),
    ...dados
  };
  ocorrencias.push(novaOcorrencia);
  return novaOcorrencia;
}

function atualizar(id, dados) {
  const ocorrencia = buscarPorId(id);
  if (!ocorrencia) {
    return null;
  }
  Object.assign(ocorrencia, dados);
  return ocorrencia;
}

function excluir(id) {
  const index = ocorrencias.findIndex(o => o.id === Number(id));
  if (index === -1) {
    return false;
  }
  ocorrencias.splice(index, 1);
  return true;
}

function contarTodos() {
  return ocorrencias.length;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  excluir,
  contarTodos
};