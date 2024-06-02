const express = require("express");
const router = express.Router();

// Importar el controlador
const orderController = require("../controllers/orderController");

// Ruta para servir la pagina del carrito de compras
router.get("/purchase", orderController.orderPage);

// Ruta para servir la pagina del historial de pedidos
router.get("/history", orderController.historyPage);

// Ruta para enviar una orden al servidor
router.post("/placeOrder", orderController.placeOrder);

// Ruta para obtener los pedidos de un usuario
router.get("/history/:username", orderController.getOrderHistory);

module.exports = router;
