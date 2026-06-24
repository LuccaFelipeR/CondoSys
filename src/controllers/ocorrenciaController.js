const ocorrenciaModel = require('../models/ocorrenciaModel');

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

function validarOcorrencia(dados) {
  const erros = [];

  if (!dados.titulo || dados.titulo.trim() === '') {
    erros.push('O título da ocorrência é obrigatório.');
  } else if (dados.titulo.trim().length < 3) {
    erros.push('O título da ocorrência deve ter pelo menos 3 caracteres.');
  }

  if (!dados.unidade || dados.unidade.trim() === '') {
    erros.push('A unidade vinculada é obrigatória.');
  }

  if (!dados.data || dados.data.trim() === '') {
    erros.push('A data do registro é obrigatória.');
  } else {
    const dataInformada = new Date(dados.data);
    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    if (dataInformada > hoje) {
      erros.push('A data do registro não pode ser futura.');
    }
  }

  const regexNomeValido = /^[A-Za-zÀ-ÿ\s]+$/;

  if (!dados.morador || dados.morador.trim() === '') {
    erros.push('O nome do morador relatante é obrigatório.');
  } else if (dados.morador.trim().length < 3) {
    erros.push('O nome do morador relatante deve ter pelo menos 3 caracteres.');
  } else if (!regexNomeValido.test(dados.morador.trim())) {
    erros.push('O nome do morador relatante deve conter apenas letras e espaços.');
  }

  const statusPermitidos = ['Pendente', 'Em Andamento', 'Resolvido'];

  if (!dados.status || !statusPermitidos.includes(dados.status)) {
    erros.push('Status inválido.');
  }

  if (!dados.descricao || dados.descricao.trim() === '') {
    erros.push('A descrição detalhada é obrigatória.');
  } else if (dados.descricao.trim().length < 10) {
    erros.push('A descrição detalhada deve ter pelo menos 10 caracteres.');
  }

  return erros;
}

async function renderizarComErros(req, res, erros) {
  try {
    const ocorrencias = await ocorrenciaModel.listarTodos();

    return res.status(400).render('ocorrencias/index', {
      titulo: 'Ocorrências',
      ocorrencias,
      usuario: obterUsuarioLogado(req),
      erros
    });
  } catch (erro) {
    console.error('Erro ao renderizar ocorrências com erros:', erro);
    return res.status(500).send('Erro crítico ao carregar ocorrências.');
  }
}

class OcorrenciaController {
  async listarOcorrencias(req, res) {
    try {
      const ocorrencias = await ocorrenciaModel.listarTodos();

      return res.render('ocorrencias/index', {
        titulo: 'Ocorrências',
        ocorrencias,
        usuario: obterUsuarioLogado(req),
        erros: []
      });
    } catch (erro) {
      console.error('Erro ao listar ocorrências:', erro);
      return res.status(500).send('Erro ao carregar as ocorrências.');
    }
  }

  async salvarOcorrencia(req, res) {
    const erros = validarOcorrencia(req.body);

    if (erros.length > 0) {
      return renderizarComErros(req, res, erros);
    }

    try {
      await ocorrenciaModel.criar(req.body);
      return res.redirect('/ocorrencias');
    } catch (erro) {
      console.error('Erro ao salvar ocorrência:', erro);
      return renderizarComErros(req, res, [erro.message]);
    }
  }

  async editarOcorrencia(req, res) {
    const id = Number(req.params.id);

    const erros = validarOcorrencia(req.body);

    if (erros.length > 0) {
      return renderizarComErros(req, res, erros);
    }

    try {
      const ocorrenciaExistente = await ocorrenciaModel.buscarPorId(id);

      if (!ocorrenciaExistente) {
        return res.status(404).send('Ocorrência não encontrada.');
      }

      await ocorrenciaModel.atualizar(id, req.body);
      return res.redirect('/ocorrencias');
    } catch (erro) {
      console.error('Erro ao editar ocorrência:', erro);
      return renderizarComErros(req, res, [erro.message]);
    }
  }

  async excluirOcorrencia(req, res) {
    const id = Number(req.params.id);

    try {
      const deletado = await ocorrenciaModel.excluir(id);

      if (!deletado) {
        return res.status(404).send('Ocorrência não encontrada.');
      }

      return res.redirect('/ocorrencias');
    } catch (erro) {
      console.error('Erro ao excluir ocorrência:', erro);
      return res.status(500).send('Erro ao excluir ocorrência.');
    }
  }
}

module.exports = new OcorrenciaController();