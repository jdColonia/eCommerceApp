const express = require("express");
const router = express.Router();

// Importar el controlador
const productController = require("../controllers/productController");

// Ruta para servir la página principal
router.get("/", productController.productPage);

// Ruta para obtener todos los productos disponibles
router.get("/products", productController.getAllProducts);

module.exports = router;
