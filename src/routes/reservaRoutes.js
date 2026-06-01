// Reserva Routes

const express = require("express");
const router = express.Router(); 

const reservaController = require("../controllers/reservaController");

router.get("/", reservaController.listarReservas);

router.get("/nova", reservaController.formNovaReserva);

router.post("/salvar", reservaController.salvarReserva);

router.get("/editar/:id", reservaController.formEditarReserva);

router.post("/editar/:id", reservaController.atualizarReserva);

router.post("/excluir/:id", reservaController.excluirReserva);

module.exports = router;

