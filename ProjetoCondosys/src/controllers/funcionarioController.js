const FuncionarioModel = require('../models/funcionarioModel');

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

async function listar(req, res) {
  try {
    const funcionarios = await FuncionarioModel.listarTodos();

    res.render('funcionarios/index', {
      titulo: 'Funcionários',
      funcionarios,
      usuario: obterUsuarioLogado(req),
      erros: []
    });
  } catch (erro) {
    console.log('Erro ao listar funcionários:');
    console.log(erro.message);
    res.status(500).send('Erro ao listar funcionários.');
  }
}

async function cadastrar(req, res) {
  try {
    const erros = validarFuncionario(req.body);
    const dadosFuncionario = montarDadosFuncionario(req.body, req);

    const cpfExiste = await FuncionarioModel.cpfJaExiste(dadosFuncionario.cpf);

    if (cpfExiste) {
      erros.push('Já existe um funcionário cadastrado com este CPF.');
    }

    if (erros.length > 0) {
      return renderizarComErros(req, res, erros);
    }

    await FuncionarioModel.cadastrar(dadosFuncionario);

    res.redirect('/funcionarios');
  } catch (erro) {
    console.log('Erro ao cadastrar funcionário:');
    console.log(erro.message);
    res.status(500).send('Erro ao cadastrar funcionário.');
  }
}

async function editar(req, res) {
  try {
    const id = Number(req.params.id);

    const funcionarioExistente = await FuncionarioModel.buscarPorId(id);

    if (!funcionarioExistente) {
      return res.status(404).send('Funcionário não encontrado.');
    }

    const erros = validarFuncionario(req.body);
    const dadosFuncionario = montarDadosFuncionario(req.body, req);

    const cpfExiste = await FuncionarioModel.cpfJaExiste(dadosFuncionario.cpf, id);

    if (cpfExiste) {
      erros.push('Já existe outro funcionário cadastrado com este CPF.');
    }

    if (erros.length > 0) {
      return renderizarComErros(req, res, erros);
    }

    await FuncionarioModel.atualizar(id, dadosFuncionario);

    res.redirect('/funcionarios');
  } catch (erro) {
    console.log('Erro ao editar funcionário:');
    console.log(erro.message);
    res.status(500).send('Erro ao editar funcionário.');
  }
}

async function inativar(req, res) {
  try {
    const id = Number(req.params.id);

    const funcionario = await FuncionarioModel.inativar(id);

    if (!funcionario) {
      return res.status(404).send('Funcionário não encontrado.');
    }

    res.redirect('/funcionarios');
  } catch (erro) {
    console.log('Erro ao inativar funcionário:');
    console.log(erro.message);
    res.status(500).send('Erro ao inativar funcionário.');
  }
}

async function reativar(req, res) {
  try {
    const id = Number(req.params.id);

    const funcionario = await FuncionarioModel.reativar(id);

    if (!funcionario) {
      return res.status(404).send('Funcionário não encontrado.');
    }

    res.redirect('/funcionarios');
  } catch (erro) {
    console.log('Erro ao reativar funcionário:');
    console.log(erro.message);
    res.status(500).send('Erro ao reativar funcionário.');
  }
}

async function renderizarComErros(req, res, erros) {
  const funcionarios = await FuncionarioModel.listarTodos();

  return res.status(400).render('funcionarios/index', {
    titulo: 'Funcionários',
    funcionarios,
    usuario: obterUsuarioLogado(req),
    erros
  });
}

function montarDadosFuncionario(body, req) {
  return {
    nome: body.nome ? body.nome.trim() : '',
    cpf: formatarCPF(body.cpf),
    cargo: body.cargo ? body.cargo.trim() : '',
    telefone: formatarTelefone(body.telefone),
    dataAdmissao: body.dataAdmissao || '',
    salario: body.salario ? Number(body.salario) : 0,
    status: body.status || 'Ativo',
    idUsuario: req.session.usuario && req.session.usuario.id
      ? req.session.usuario.id
      : 1
  };
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