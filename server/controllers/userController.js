const path = require("path");

// Importar el modelo
const User = require("../models/user");

// Arreglo para almacenar los usuarios
let users = [];

// Controlador para mostrar la página de registro de usuario
exports.registerPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/html/register.html"));
};

// Controlador para registrar un nuevo usuario
exports.register = (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { username, password, role } = req.body;

  // Verificar si todos los campos necesarios están presentes
  if (!username || !password || !role) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // Verificar si el nombre de usuario ya está en uso
  if (users.find((user) => user.username === username)) {
    return res
      .status(400)
      .json({ error: "El nombre de usuario ya está en uso" });
  }

  // Crear una nueva instancia del usuario
  const newUser = new User(username, password, role);

  // Agregar el nuevo usuario al arreglo de usuarios en memoria
  users.push(newUser);

  // Respondemos con el nuevo usuario creado
  res
    .status(201)
    .json({ message: "Usuario registrado correctamente", user: newUser });
};

// Controlador para mostrar la página de inicio de sesión
exports.loginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/html/login.html"));
};

// Controlador para iniciar sesión de un usuario
exports.login = (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { username, password } = req.body;

  // Verificar si todos los campos necesarios están presentes
  if (!username || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // Buscar el usuario en el arreglo de usuarios en memoria
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  // Verificar si el usuario fue encontrado
  if (!user) {
    return res
      .status(404)
      .json({ error: "Usuario no encontrado o contraseña incorrecta" });
  }

  // Respondemos con el usuario encontrado
  res.status(200).json({ message: "Inicio de sesión exitoso", user });
};
