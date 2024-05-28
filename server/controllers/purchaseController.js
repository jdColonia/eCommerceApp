// Importar el módulo 'path'
const path = require("path");

// Controlador para mostrar la nueva página HTML
exports.purchasePage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/html/purchase.html"));
};
