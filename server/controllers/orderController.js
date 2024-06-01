// Importar el modelo
const Order = require("../models/order");
const path = require("path");

// Arreglo para almacenar los pedidos
let carts = [];

exports.orderPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/html/purchase.html"));
};



// Controlador para realizar un nuevo pedido
exports.placeOrder = (req, res) => {
  const cartItems = req.body.items || [];
  if (cartItems.length === 0) {
      return res.status(400).json({
          error: "No hay productos en el carrito para realizar el pedido",
      });
  }

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const newOrder = new Order(req.user.username, cartItems, total);

  orders.push(newOrder);

  res.status(201).json({ message: "Pedido realizado correctamente", order: newOrder });
}
