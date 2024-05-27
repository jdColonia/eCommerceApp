const multer = require("multer");

// Configuración de multer para almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../client/public/images"); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}`); // Nombre del archivo
  },
});

const upload = multer({ storage });

module.exports = upload;
