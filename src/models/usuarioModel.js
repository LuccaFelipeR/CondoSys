const usuarios = [
  {
    id: 1,
    nome: 'Administrador Geral',
    email: 'admin@condosys.com.br',
    telefone: '(43) 9 9900-0001',
    tipo: 'Administrador',
    cadastradoEm: '01/01/2024',
    ativo: true
  }
];

function listarTodos() {
  return usuarios;
}

function buscarPorId(id) {
  return usuarios.find(usuario => usuario.id === Number(id));
}

function buscarPorEmail(email) {
  return usuarios.find(usuario => usuario.email === email);
}

function buscarUsuarioPadrao() {
  return usuarios[0];
}

function contarTodos() {
  return usuarios.length;
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorEmail,
  buscarUsuarioPadrao,
  contarTodos
};