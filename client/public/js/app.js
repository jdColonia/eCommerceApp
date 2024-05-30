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
  // Cargar los productos
  loadProducts();
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

function loadProducts() {
  fetch("/products")
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;
      const productContent = document.querySelector(".product-content");
      productContent.innerHTML = ""; // Limpiar contenido existente
      products.forEach((product) => {
        console.log(product.image);
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
          <img src="../uploads/${product.image}" alt="${product.name}" />
          <div class="product-txt">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <a href="#" class="add-car btn-2" data-id="${product._id}">Agregar al carrito</a>
          </div>
        `;
        productContent.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
    });
}

function loadEventListeners() {
  document
    .querySelector(".product-content")
    .addEventListener("click", buyElement);
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
    const element = e.target.closest(".product");
    readDataElement(element);
  }
}

function readDataElement(element) {
  const infoElement = {
    image: element.querySelector("img").src,
    title: element.querySelector("h3").textContent,
    price: element.querySelector(".price").textContent,
    id: element.querySelector("a").getAttribute("data-id"),
  };
  console.log(infoElement);
  addCar(infoElement);
}

function addCar(infoElement) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <img src="${infoElement.image}" width="100" />
    </td>
    <td>${infoElement.title}</td>
    <td>${infoElement.price}</td>
    <td>
      <a href="#" class="delete" data-id="${infoElement.id}">X</a>
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
