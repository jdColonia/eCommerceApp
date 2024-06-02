const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// Middleware para parsear el cuerpo de las solicitudes HTTP
app.use(bodyParser.json());
app.use(express.json());
// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "../client/public")));
app.use("/images", express.static(path.join(__dirname, "../images"))); // Se usa principalmente para el banner

// Configuración de las rutas
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const orderController = require('./controllers/orderController');

app.use(adminRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(userRoutes);

app.use(express.static(path.join(__dirname, '../client/public')));


// Configuración ruta error 404
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/html/404.html"));
});


// Ruta para realizar una compra y guardar en el historial
app.post('/purchase', (req, res) => {
  const newOrder = req.body; // Contiene los detalles de la compra actual
  // Simula guardar en una base de datos
  orders.push(newOrder); // 'orders' es una lista que almacena el historial de pedidos
  res.status(201).json({ message: 'Order placed successfully', order: newOrder });
});

// Ruta para obtener el historial de pedidos
app.get('/history', (req, res) => {
  res.json({ orders: orders });
});

app.post('/placeOrder', orderController.placeOrder);
module.exports = app;
