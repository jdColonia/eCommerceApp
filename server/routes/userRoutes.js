const express = require("express");
const router = express.Router();

// Importar el controlador
const userController = require("../controllers/userController");

// Ruta para servir el formulario de registro de usuario
router.get("/register", userController.registerPage);

// Ruta para registrar un nuevo usuario
router.post("/register", userController.register);

// Ruta para servir el formulario de inicio de sesión
router.get("/login", userController.loginPage);

// Ruta para iniciar sesión
router.post("/login", userController.login);

module.exports = router;
