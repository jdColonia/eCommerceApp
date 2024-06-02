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

app.use(adminRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(userRoutes);

app.use(express.static(path.join(__dirname, "../client/public")));

// Configuración ruta error 404
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/html/404.html"));
});

module.exports = app;
