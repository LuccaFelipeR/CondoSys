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
  const erros = validarFuncionario(req.body);

  if (erros.length > 0) {
    return res.status(400).send(`
      <h2>Erro ao cadastrar funcionário</h2>
      <ul>
        ${erros.map(erro => `<li>${erro}</li>`).join('')}
      </ul>
      <a href="/funcionarios">Voltar</a>
    `);
  }

  const dadosFuncionario = {
    nome: req.body.nome.trim(),
    cpf: formatarCPF(req.body.cpf),
    cargo: req.body.cargo.trim(),
    telefone: formatarTelefone(req.body.telefone),
    dataAdmissao: formatarDataParaTabela(req.body.dataAdmissao),
    status: req.body.status || 'Ativo'
  };

  FuncionarioModel.cadastrar(dadosFuncionario);

  res.redirect('/funcionarios');
}

function editar(req, res) {
  const id = Number(req.params.id);

  const erros = validarFuncionario(req.body);

  if (erros.length > 0) {
    return res.status(400).send(`
      <h2>Erro ao editar funcionário</h2>
      <ul>
        ${erros.map(erro => `<li>${erro}</li>`).join('')}
      </ul>
      <a href="/funcionarios">Voltar</a>
    `);
  }

  const dadosFuncionario = {
    nome: req.body.nome.trim(),
    cpf: formatarCPF(req.body.cpf),
    cargo: req.body.cargo.trim(),
    telefone: formatarTelefone(req.body.telefone),
    dataAdmissao: formatarDataParaTabela(req.body.dataAdmissao),
    status: req.body.status || 'Ativo'
  };

  const funcionario = FuncionarioModel.atualizar(id, dadosFuncionario);

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

function validarTexto(valor, campo) {
  if (!valor || valor.trim() === '') {
    return `${campo} é obrigatório.`;
  }

  const texto = valor.trim();

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

function validarFuncionario(dados) {
  const erros = [];

  const erroNome = validarTexto(dados.nome, 'Nome');
  const erroCargo = validarTexto(dados.cargo, 'Cargo');
  const erroCPF = validarCPF(dados.cpf);
  const erroTelefone = validarTelefone(dados.telefone);

  if (erroNome) erros.push(erroNome);
  if (erroCargo) erros.push(erroCargo);
  if (erroCPF) erros.push(erroCPF);
  if (erroTelefone) erros.push(erroTelefone);

  if (!dados.dataAdmissao || dados.dataAdmissao.trim() === '') {
    erros.push('Data de admissão é obrigatória.');
  }

  return erros;
}

module.exports = {
  listar,
  cadastrar,
  editar,
  inativar
};