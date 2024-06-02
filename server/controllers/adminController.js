const path = require("path");
const fs = require("fs");

// Importar el modelo
const Product = require("../models/product");

// Ruta al archivo JSON de productos
const productsFilePath = path.join(__dirname, "../../data/product.json");

// Arreglo para almacenar los productos
let products = [];

// Controlador para cargar los productos desde el archivo JSON al iniciar el servidor
function loadProducts() {
  try {
    // Leer los datos del archivo JSON
    const data = fs.readFileSync(productsFilePath, "utf-8");
    // Convertir los datos en un objeto JSON
    const jsonData = JSON.parse(data);
    // Extraer el array de productos del objeto JSON
    products = jsonData.products;
  } catch (error) {
    console.error("Error al cargar los productos desde el archivo JSON:", error);
  }
}

// Llamar a la función para cargar los productos al iniciar el servidor
loadProducts();

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

  // Verificar si ya existe un producto con el mismo nombre
  const existingProduct = products.find((product) => product.name === name);
  if (existingProduct) {
    return res.status(400).json({ error: "Ya existe un producto con ese nombre" });
  }

  // Crear una nueva instancia del producto
  const newProduct = new Product(name, image, description, price, quantity);

  // Agregar el nuevo producto al arreglo de productos en memoria
  products.push(newProduct);

  // Respondemos con el nuevo producto creado
  res.status(201).json({ message: "Producto agregado correctamente", product: newProduct });
};

// Exportar el arreglo de productos
exports.getProducts = () => {
  return products;
};
