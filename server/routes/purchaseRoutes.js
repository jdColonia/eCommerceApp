const express = require("express");
const router = express.Router();

// Importa el controlador para la página de compra
const purchaseController = require("../controllers/purchaseController");

// Ruta para servir la página de compra
router.get("/purchase", purchaseController.purchasePage);

module.exports = router;
