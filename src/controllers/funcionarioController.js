const FuncionarioModel = require('../models/funcionarioModel');

function listar(req, res) {
  const funcionarios = FuncionarioModel.listarTodos();

  res.render('funcionarios/index', {
    titulo: 'Funcionários',
    funcionarios,
    usuario: req.session.usuario
  });
}

function cadastrar(req, res) {
  const novoFuncionario = {
    nome: req.body.nome,
    cpf: formatarCPF(req.body.cpf),
    cargo: req.body.cargo,
    telefone: formatarTelefone(req.body.telefone),
    dataAdmissao: formatarDataParaTabela(req.body.dataAdmissao),
    status: req.body.status || 'Ativo'
  };

  FuncionarioModel.cadastrar(novoFuncionario);

  res.redirect('/funcionarios');
}

function editar(req, res) {
  const id = Number(req.params.id);

  const funcionarioAtualizado = {
    nome: req.body.nome,
    cpf: formatarCPF(req.body.cpf),
    cargo: req.body.cargo,
    telefone: formatarTelefone(req.body.telefone),
    dataAdmissao: formatarDataParaTabela(req.body.dataAdmissao),
    status: req.body.status || 'Ativo'
  };

  const funcionario = FuncionarioModel.atualizar(id, funcionarioAtualizado);

  if (!funcionario) {
    return res.status(404).send('Funcionário não encontrado.');
  }

  res.redirect('/funcionarios');
}

function inativar(req, res) {
  const id = Number(req.params.id);

  const funcionario = FuncionarioModel.inativar(id);

  if (!funcionario) {
    return res.status(404).send('Funcionário não encontrado.');
  }

  res.redirect('/funcionarios');
}

function formatarDataParaTabela(data) {
  if (!data) return '';

  if (data.includes('/')) return data;

  const partes = data.split('-');

  if (partes.length !== 3) return data;

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function limparNumeros(valor) {
  if (!valor) return '';
  return valor.replace(/\D/g, '');
}

function formatarCPF(cpf) {
  const cpfLimpo = limparNumeros(cpf);

  if (cpfLimpo.length !== 11) {
    return cpf;
  }

  return cpfLimpo.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  );
}

function formatarTelefone(telefone) {
  const telefoneLimpo = limparNumeros(telefone);

  if (telefoneLimpo.length === 11) {
    return telefoneLimpo.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/,
      '($1) $2 $3-$4'
    );
  }

  if (telefoneLimpo.length === 10) {
    return telefoneLimpo.replace(
      /(\d{2})(\d{4})(\d{4})/,
      '($1) $2-$3'
    );
  }

  return telefone;
}

module.exports = {
  listar,
  cadastrar,
  editar,
  inativar
};