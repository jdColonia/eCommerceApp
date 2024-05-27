const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// Middleware para parsear el cuerpo de las solicitudes HTTP
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/images', express.static(path.join(__dirname, '../images')));

// Configuración de las rutas
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(adminRoutes);
app.use(productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use(userRoutes);

// Configuración ruta error 404
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/html/404.html"));
});

module.exports = app;
