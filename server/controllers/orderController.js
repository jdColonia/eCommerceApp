// Importar el modelo
const Order = require("../models/order");
const path = require("path");

exports.orderPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/html/purchase.html"));
};

// Arreglo para almacenar los pedidos
let orders = [];

// Controlador para realizar un nuevo pedido
exports.placeOrder = (req, res) => {
  // Verificar si el carrito del usuario existe
  const existingCart = carts.find((cart) => cart.user === req.user.username);
  if (!existingCart || existingCart.items.length === 0) {
    return res
      .status(400)
      .json({
        error: "No hay productos en el carrito para realizar el pedido",
      });
  }

  // Calcular el total del pedido
  const total = existingCart.getTotal();

  // Crear una nueva instancia del pedido
  const newOrder = new Order(req.user.username, existingCart.items, total);

  // Agregar el nuevo pedido al arreglo de pedidos en memoria
  orders.push(newOrder);

  // Limpiar el carrito de compras del usuario después de realizar el pedido
  existingCart.clearCart();

  // Respondemos con el nuevo pedido creado
  res
    .status(201)
    .json({ message: "Pedido realizado correctamente", order: newOrder });
}

exports.getOrderHistory = (req, res) => {
  res.json({ orders: orders });
};
