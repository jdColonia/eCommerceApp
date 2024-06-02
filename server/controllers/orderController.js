const Order = require("../models/order");
const path = require("path");

// Arreglo para almacenar las ordenes
let orders = [];

// Importar el arreglo de productos desde adminController.js
const { getProducts } = require("../controllers/adminController");

// Obtener los productos
let products = getProducts();

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

  // Verificar si hay suficiente stock para todos los productos en el carrito
  const insufficientStock = cartItems.some((cartItem) => {
    const product = products.find((product) => product.name === cartItem.id);
    return product && product.quantity < cartItem.quantity;
  });

  // Si hay stock insuficiente, enviar una respuesta de error
  if (insufficientStock) {
    return res.status(400).json({ success: false, message: "No hay suficiente stock de algunos productos" });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const newOrder = new Order(username, cartItems, total);

  // Restar las cantidades de los productos solo después de que se haya confirmado la compra
  cartItems.forEach((cartItem) => {
    const product = products.find((product) => product.name === cartItem.id);
    if (product) {
      product.quantity -= cartItem.quantity;
    }
  });

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
