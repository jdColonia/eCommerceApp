const express = require("express");
const router = express.Router();

// Importar el controlador
const cartController = require("../controllers/cartController");

// Ruta para agregar un producto al carrito
router.post("/addItem", cartController.addItem);

// Ruta para eliminar un producto del carrito
router.delete("/removeItem/:index", cartController.removeItem);

module.exports = router;
