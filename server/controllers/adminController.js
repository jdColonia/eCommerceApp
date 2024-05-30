const path = require("path");

// Importar el modelo
const Product = require("../models/product");

// Arreglo para almacenar los productos
let products = [];

// Controlador para mostrar la página de registro de productos
exports.addProductPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/html/admin.html"));
};

// Controlador para agregar un nuevo producto al inventario
exports.addProduct = (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { name, description, price, quantity } = req.body;
  // Ruta de la imagen guardada
  const image = req.file.originalname;

  // Verificar si todos los campos necesarios están presentes
  if (!name || !image || !description || !price || !quantity) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // Crear una nueva instancia del producto
  const newProduct = new Product(name, image, description, price, quantity);

  // Agregar el nuevo producto al arreglo de productos en memoria
  products.push(newProduct);

  // Respondemos con el nuevo producto creado
  res
    .status(201)
    .json({ message: "Producto agregado correctamente", product: newProduct });
};

// Exportar el arreglo de productos
exports.getProducts = () => {
  return products;
};
