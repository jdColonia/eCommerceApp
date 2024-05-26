const express = require("express");
const router = express.Router();

// Importar el controlador
const adminController = require("../controllers/adminController");

// Ruta para agregar un nuevo producto al inventario
router.post("/addProduct", adminController.addProduct);

module.exports = router;
