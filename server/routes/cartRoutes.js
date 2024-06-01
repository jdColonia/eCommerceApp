const express = require("express");
const router = express.Router();

// Importar el controlador
const cartController = require("../controllers/cartController");
router.get("/items", cartController.getCartItems);
router.post("/addItem", cartController.addItem);

// router.delete("/removeItem/:index", cartController.removeItem);
// router.delete("/flush", cartController.flushCart);
// // Ruta para eliminar un producto del carrito
// router.delete("/removeItem/:index", cartController.removeItem);

module.exports = router;
