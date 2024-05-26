const path = require("path");

// Importar el arreglo de productos desde adminController.js
const { getProducts } = require("../controllers/adminController");

// Obtener los productos
const products = getProducts();

// Controlador para mostrar la página principal
exports.productPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/html/app.html"));
};

// Controlador para obtener todos los productos del inventario
exports.getAllProducts = (req, res) => {
  // Respondemos con todos los productos en el inventario
  res.status(200).json({ products });
};
