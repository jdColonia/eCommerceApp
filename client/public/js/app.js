const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const historyBtn = document.getElementById("history-btn");
const logoutBtn = document.getElementById("logout-btn");
const addProductBtn = document.getElementById("add-product-btn");

const carShop = document.getElementById("car-shop");
const element1 = document.getElementById("shop-list");
const list = document.querySelector("#shop-list tbody");
const flushCarBtn = document.getElementById("flush-car-shop");

document.addEventListener("DOMContentLoaded", () => {
  // Función para verificar el estado de inicio de sesión
  checkLoginStatus();
  // Cargar los listeners de eventos
  loadEventListeners();
});

function checkLoginStatus() {
  // Verificar si el usuario ha iniciado sesión
  const isLoggedIn = sessionStorage.getItem("LoggedIn");
  // Verificar el tipo de usuario logueado
  const userRole = sessionStorage.getItem("UserRole");
  if (isLoggedIn === "true") {
    // Si el usuario ha iniciado sesión, mostrar botón de ver pedidos y cerrar sesión
    historyBtn.style.display = "block";
    logoutBtn.style.display = "block";
    // Mostrar el botón de "Añadir productos" si el usuario es un administrador
    if (userRole === "admin") addProductBtn.style.display = "block";
  } else {
    // Si el usuario no ha iniciado sesión, mostrar botones de inicio de sesión y registro
    loginBtn.style.display = "block";
    registerBtn.style.display = "block";
  }
}

function loadEventListeners() {
  element1.addEventListener("click", buyElement);
  flushCarBtn.addEventListener("click", flushCar);
  logoutBtn.addEventListener("click", logout);
}

function logout() {
  // Eliminar indicador de inicio de sesión y rol del usuario
  sessionStorage.removeItem("LoggedIn");
  sessionStorage.removeItem("UserRole");
  historyBtn.style.display = "none";
  logoutBtn.style.display = "none";
  addProductBtn.style.display = "none";
}

function buyElement(e) {
  e.preventDefault();
  if (e.target.classList.contains("add-car")) {
    const element = e.target.parentElement.parentElement;
    readDataElement(element);
  }
}

function readDataElement(e) {
  const infoElement = {
    image: e.querySelector("img").src,
    title: e.querySelector("h3").textContent,
    price: e.querySelector(".price").textContent,
    id: e.querySelector("a").getAttribute("data-id"),
  };
  console.log(infoElement);
  addCar(infoElement);
}

function addCar(e) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>
            <img src="${e.image}" width=100 />
        </td>
        <td>
            ${e.title}
        </td>
        <td>
            ${e.price}
        </td>
        <td>
            <a href="#" class="delete" data-id="${e.id}">X </a>
        </td>
    `;
  list.appendChild(row);
}

function flushCar() {
  // Vaciar el carrito eliminando todos los elementos de la lista
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  return false;
}
