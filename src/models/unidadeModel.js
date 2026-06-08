const unidades = [
    {
        id_unidade: 1,
        bloco: "A",
        numero: "101",
        andar: 1,
        status: "Ativa"
    },
    {
        id_unidade: 2,
        bloco: "A",
        numero: "102",
        andar: 1,
        status: "Ativa"
    },
    {
        id_unidade: 3,
        bloco: "B",
        numero: "201",
        andar: 2,
        status: "Inativa"
    }
];


function cadastrar(unidade) {
    unidade.id_unidade = unidades.length + 1;
    
    unidades.push(unidade);
    
    return unidade;
}

function atualizar(id, dadosAtualizados) {
    const unidade = unidades.find(
        u => u.id_unidade === id
    );
    
    if (!unidade) {
        return null;
    }
    
    Object.assign(unidade, dadosAtualizados);
    
    return unidade;
}

function inativar(id) {
    const unidade = unidades.find(
        u => u.id_unidade === id
    );
    
    if (!unidade) {
        return null;
    }
    
    unidade.status = "Inativa";
    
    return unidade;
}
function listarTodos() {
    return unidades;
}

function contarTodos() {
    return unidades.length;
}

module.exports = {
    listarTodos,
    cadastrar,
    atualizar,
    inativar,
    contarTodos
};