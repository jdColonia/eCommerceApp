const Order = require("../models/order");
const path = require("path");

const orders = [];

exports.orderPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/html/purchase.html"));
};

exports.historyPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/html/history.html"));
};

exports.placeOrder = (req, res) => {
  const { username, cartItems } = req.body;
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "El carrito está vacío" });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const newOrder = new Order(username, cartItems, total);

  orders.push(newOrder);
  res.json({ success: true, order: newOrder });
};

exports.getOrderHistory = (req, res) => {
  const username = req.params.username;

  try {
    const userOrders = orders.filter((order) => order.customer === username);
    res.json({ success: true, orders: userOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener los pedidos" });
  }
};
