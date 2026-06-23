const express = require("express");
const router = express.Router();

const reservaController = require("../controllers/reservaController");
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get("/", reservaController.listarReservas);
router.get("/nova", reservaController.formNovaReserva);
router.post("/salvar", reservaController.salvarReserva);
router.get("/:id/editar/", reservaController.formEditarReserva);
router.post("/:id/editar/", reservaController.atualizarReserva);
router.post("/:id/excluir/", reservaController.excluirReserva); 

module.exports = router;

