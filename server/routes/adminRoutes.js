const express = require("express");
const router = express.Router();

// Importar el controlador
const adminController = require("../controllers/adminController");

// Importar el almacenamiento de imagenes
const upload = require("../libs/storage");

// Ruta para servir el formulario de registro de productos
router.get("/add_product", adminController.addProductPage);

// Ruta para agregar un nuevo producto al inventario
router.post("/add_product", upload.single("image"), adminController.addProduct);

module.exports = router;
