const express = require("express");
const router = express.Router();

const unidadeController = require("../controllers/unidadeController");

console.log("CONTROLLER:");
console.log(unidadeController);

// Listar
router.get("/", unidadeController.listarUnidades);

// Form cadastro
router.get("/nova", unidadeController.formNovaUnidade);

// Salvar
router.post("/salvar", unidadeController.salvarUnidade);

// Form editar
router.get("/editar/:id", unidadeController.formEditarUnidade);

// Atualizar
router.post("/editar/:id", unidadeController.atualizarUnidade);

// Excluir
router.post("/excluir/:id", unidadeController.excluirUnidade);

module.exports = router;