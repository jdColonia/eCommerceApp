const express = require("express");
const router = express.Router();

// Importar el controlador
const orderController = require("../controllers/orderController");

// Ruta para realizar un pedido
router.post("/placeOrder", orderController.placeOrder);

module.exports = router;
