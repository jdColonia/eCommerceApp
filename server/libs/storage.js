const multer = require("multer");
const path = require("path");

// Configuración de multer para almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../client/public/uploads")); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre del archivo
  },
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extname) {
    return cb(null, true);
  }
  cb("Error: Archivo debe ser una imagen válida (jpeg, jpg, png)");
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Límite de tamaño del archivo 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
