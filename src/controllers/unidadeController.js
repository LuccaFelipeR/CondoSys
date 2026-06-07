exports.listarUnidades = (req, res) => {
    const unidades = [];

    res.render("unidades/index", {
        unidades
    });
};

exports.formNovaUnidade = (req, res) => {
    res.render("unidades/nova");
};

exports.salvarUnidade = (req, res) => {
    console.log(req.body);

    res.redirect("/unidades");
};

exports.formEditarUnidade = (req, res) => {
    const { id } = req.params;

    res.render("unidades/editar", {
        id
    });
};

exports.atualizarUnidade = (req, res) => {
    const { id } = req.params;

    console.log("Atualizando:", id);

    res.redirect("/unidades");
};

exports.excluirUnidade = (req, res) => {
    const { id } = req.params;

    console.log("Excluindo:", id);

    res.redirect("/unidades");
};