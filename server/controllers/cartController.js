// Importar el modelo
const Cart = require("../models/cart");

// Arreglo para almacenar los carritos de compras
let carts = [];

// Controlador para agregar un producto al carrito
exports.addItem = (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { product, quantity } = req.body;

  // Verificar si todos los campos necesarios están presentes
  if (!product || !quantity) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // Verificar si el producto existe en el carrito del usuario
  const existingCart = carts.find((cart) => cart.user === req.user.username);
  if (!existingCart) {
    // Si no existe un carrito para el usuario, crear uno nuevo
    const newCart = new Cart(req.user.username);
    newCart.addItem(product, quantity);
    carts.push(newCart);
  } else {
    // Si ya existe un carrito para el usuario, agregar el producto al carrito existente
    existingCart.addItem(product, quantity);
  }

  // Respondemos con el carrito de compras actualizado
  res
    .status(200)
    .json({
      message: "Producto agregado al carrito correctamente",
      cart: existingCart || newCart,
    });
}

// Controlador para eliminar un producto del carrito
exports.removeItem = (req, res) => {
  // Extraer el índice del producto a eliminar del parámetro de la URL
  const { index } = req.params;

  // Verificar si el índice es válido
  if (isNaN(index)) {
    return res
      .status(400)
      .json({ error: "El índice del producto es inválido" });
  }

  // Verificar si el carrito del usuario existe
  const existingCart = carts.find((cart) => cart.user === req.user.username);
  if (!existingCart) {
    return res
      .status(404)
      .json({ error: "El carrito del usuario no fue encontrado" });
  }

  // Verificar si el índice está dentro del rango del arreglo de productos en el carrito
  if (index < 0 || index >= existingCart.items.length) {
    return res
      .status(400)
      .json({ error: "El índice del producto a eliminar es inválido" });
  }

  // Eliminar el producto del carrito
  existingCart.removeItem(index);

  // Respondemos con el carrito de compras actualizado
  res
    .status(200)
    .json({
      message: "Producto eliminado del carrito correctamente",
      cart: existingCart,
    });
}
