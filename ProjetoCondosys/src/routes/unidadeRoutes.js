const express = require("express");
const router = express.Router();

const unidadeController = require("../controllers/unidadeController");
const authMiddleware = require('../middlewares/authMiddleware');


console.log("CONTROLLER:");
console.log(unidadeController);

router.use(authMiddleware);
// Listar
router.get("/", unidadeController.listarUnidades);

// Salvar
router.post("/salvar", unidadeController.salvarUnidade);

// Atualizar
router.post("/editar/:id", unidadeController.atualizarUnidade);

// Excluir
router.post("/excluir/:id", unidadeController.excluirUnidade);

module.exports = router;