const express = require("express");
const router = express.Router();
const path = require('path');

// Importar el controlador
const orderController = require("../controllers/orderController");

router.get("/purchase", orderController.orderPage);

// Ruta para servir el archivo JSON
router.get('/order-history', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/data/orderHistory.json'));
  });

// Ruta para realizar un pedido
router.post("/placeOrder", orderController.placeOrder);

router.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/html/history.html'));
  });

module.exports = router;
