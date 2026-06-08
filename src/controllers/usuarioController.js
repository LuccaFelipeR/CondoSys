const UsuarioModel = require('../models/usuarioModel');

function perfil(req, res) {
  const usuarioSessao = req.session.usuario;
  let usuarioBase;

  if (usuarioSessao && usuarioSessao.id) {
    usuarioBase = UsuarioModel.buscarPorId(usuarioSessao.id);
  }

  if (!usuarioBase && usuarioSessao && usuarioSessao.email) {
    usuarioBase = UsuarioModel.buscarPorEmail(usuarioSessao.email);
  }

  if (!usuarioBase) {
    usuarioBase = UsuarioModel.buscarUsuarioPadrao();
  }

  const usuarioPerfil = {
    nome: usuarioBase.nome || 'Administrador Geral',
    iniciais: gerarIniciais(usuarioBase.nome || 'Administrador Geral'),
    email: usuarioBase.email || 'admin@condosys.com.br',
    telefone: usuarioBase.telefone || '(43) 9 9900-0001',
    tipo: usuarioBase.tipo || 'Administrador',
    cadastradoEm: usuarioBase.cadastradoEm || '01/01/2024'
  };

  res.render('usuarios/index', {
    titulo: 'Perfil do Usuário',
    usuario: usuarioPerfil,
    paginaAtiva: 'perfil'
  });
}

function gerarIniciais(nome) {
  if (!nome) {
    return 'AD';
  }

  const partes = nome.trim().split(' ');

  if (partes.length === 1) {
    return partes[0].substring(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

module.exports = {
  perfil
};