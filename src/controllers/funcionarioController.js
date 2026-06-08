const FuncionarioModel = require('../models/funcionarioModel');

function listar(req, res) {
  const funcionarios = FuncionarioModel.listarTodos();

  res.render('funcionarios/index', {
    titulo: 'Funcionários',
    funcionarios,
    usuario: req.session.usuario,
    erros: []
  });
}

function cadastrar(req, res) {
  const erros = validarFuncionario(req.body);

  const dadosFuncionario = montarDadosFuncionario(req.body);

  if (FuncionarioModel.cpfJaExiste(dadosFuncionario.cpf)) {
    erros.push('Já existe um funcionário cadastrado com este CPF.');
  }

  if (erros.length > 0) {
    return renderizarComErros(req, res, erros);
  }

  FuncionarioModel.cadastrar(dadosFuncionario);

  res.redirect('/funcionarios');
}

function editar(req, res) {
  const id = Number(req.params.id);

  const funcionarioExistente = FuncionarioModel.buscarPorId(id);

  if (!funcionarioExistente) {
    return res.status(404).send('Funcionário não encontrado.');
  }

  const erros = validarFuncionario(req.body);

  const dadosFuncionario = montarDadosFuncionario(req.body);

  if (FuncionarioModel.cpfJaExiste(dadosFuncionario.cpf, id)) {
    erros.push('Já existe outro funcionário cadastrado com este CPF.');
  }

  if (erros.length > 0) {
    return renderizarComErros(req, res, erros);
  }

  FuncionarioModel.atualizar(id, dadosFuncionario);

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

function reativar(req, res) {
  const id = Number(req.params.id);

  const funcionario = FuncionarioModel.reativar(id);

  if (!funcionario) {
    return res.status(404).send('Funcionário não encontrado.');
  }

  res.redirect('/funcionarios');
}

function renderizarComErros(req, res, erros) {
  const funcionarios = FuncionarioModel.listarTodos();

  return res.status(400).render('funcionarios/index', {
    titulo: 'Funcionários',
    funcionarios,
    usuario: req.session.usuario,
    erros
  });
}

function montarDadosFuncionario(body) {
  return {
    nome: body.nome ? body.nome.trim() : '',
    cpf: formatarCPF(body.cpf),
    cargo: body.cargo ? body.cargo.trim() : '',
    telefone: formatarTelefone(body.telefone),
    dataAdmissao: formatarDataParaTabela(body.dataAdmissao),
    status: body.status || 'Ativo'
  };
}

function formatarDataParaTabela(data) {
  if (!data) {
    return '';
  }

  if (data.includes('/')) {
    return data;
  }

  const partes = data.split('-');

  if (partes.length !== 3) {
    return data;
  }

  const ano = partes[0];
  const mes = partes[1];
  const dia = partes[2];

  return `${dia}/${mes}/${ano}`;
}

function limparNumeros(valor) {
  if (!valor) {
    return '';
  }

  return valor.replace(/\D/g, '');
}

function formatarCPF(cpf) {
  const cpfLimpo = limparNumeros(cpf);

  if (cpfLimpo.length !== 11) {
    return cpf || '';
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

  return telefone || '';
}

function validarTexto(valor, campo) {
  if (!valor || valor.trim() === '') {
    return `${campo} é obrigatório.`;
  }

  const texto = valor.trim();

  if (texto.length < 3) {
    return `${campo} deve ter pelo menos 3 caracteres.`;
  }

  const regex = /^[A-Za-zÀ-ÿ\s]+$/;

  if (!regex.test(texto)) {
    return `${campo} não pode conter números ou caracteres especiais.`;
  }

  return null;
}

function validarCPF(cpf) {
  const cpfLimpo = limparNumeros(cpf);

  if (cpfLimpo.length !== 11) {
    return 'CPF deve conter exatamente 11 números.';
  }

  return null;
}

function validarTelefone(telefone) {
  const telefoneLimpo = limparNumeros(telefone);

  if (telefoneLimpo.length !== 10 && telefoneLimpo.length !== 11) {
    return 'Telefone deve conter 10 ou 11 números.';
  }

  return null;
}

function validarDataAdmissao(data) {
  if (!data || data.trim() === '') {
    return 'Data de admissão é obrigatória.';
  }

  const dataInformada = new Date(data);
  const hoje = new Date();

  hoje.setHours(0, 0, 0, 0);

  if (dataInformada > hoje) {
    return 'Data de admissão não pode ser futura.';
  }

  return null;
}

function validarStatus(status) {
  const statusPermitidos = ['Ativo', 'Inativo'];

  if (!statusPermitidos.includes(status)) {
    return 'Status inválido.';
  }

  return null;
}

function validarFuncionario(dados) {
  const erros = [];

  const erroNome = validarTexto(dados.nome, 'Nome');
  const erroCargo = validarTexto(dados.cargo, 'Cargo');
  const erroCPF = validarCPF(dados.cpf);
  const erroTelefone = validarTelefone(dados.telefone);
  const erroDataAdmissao = validarDataAdmissao(dados.dataAdmissao);
  const erroStatus = validarStatus(dados.status || 'Ativo');

  if (erroNome) erros.push(erroNome);
  if (erroCargo) erros.push(erroCargo);
  if (erroCPF) erros.push(erroCPF);
  if (erroTelefone) erros.push(erroTelefone);
  if (erroDataAdmissao) erros.push(erroDataAdmissao);
  if (erroStatus) erros.push(erroStatus);

  return erros;
}

module.exports = {
  listar,
  cadastrar,
  editar,
  inativar,
  reativar
};