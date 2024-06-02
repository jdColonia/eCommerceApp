const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const historyBtn = document.getElementById("history-btn");
const logoutBtn = document.getElementById("logout-btn");
const addProductBtn = document.getElementById("add-product-btn");

const carShop = document.getElementById("car-shop");
const element1 = document.getElementById("shop-list");
const list = document.querySelector("#shop-list tbody");
const flushCarBtn = document.getElementById("flush-car-shop");

// Variable global para almacenar los productos del carrito
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

document.addEventListener("DOMContentLoaded", () => {
  // Función para verificar el estado de inicio de sesión
  checkLoginStatus();
  // Cargar los listeners de eventos
  loadEventListeners();
  // Cargar los productos
  loadProducts();
  // Mostrar los productos en el carrito
  renderCart();
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
      productContent.innerHTML = "";
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
          <img src="../uploads/${product.image}" alt="${product.name}" />
          <div class="product-txt">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <a href="#" class="add-car btn-2" data-id="${product.name}">Agregar al carrito</a>
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
  document.querySelector(".product-content").addEventListener("click", buyElement);
  flushCarBtn.addEventListener("click", flushCar);
  list.addEventListener("click", deleteFromCart);
  logoutBtn.addEventListener("click", logout);
  document.getElementById("purchase-btn").addEventListener("click", () => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  });
}

function logout() {
  // Eliminar indicador de inicio de sesión y rol del usuario
  sessionStorage.removeItem("LoggedIn");
  sessionStorage.removeItem("UserRole");
  sessionStorage.removeItem("User");
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
    price: parseFloat(element.querySelector(".price").textContent.replace("$", "")),
    id: element.querySelector("a").getAttribute("data-id"),
    quantity: 1,
  };

  const existingItem = cartItems.find((item) => item.id === infoElement.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push(infoElement);
  }

  renderCart();
}

function renderCart() {
  list.innerHTML = "";
  cartItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" width="100" /></td>
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td>${item.quantity}</td>
      <td><a href="#" class="delete" data-id="${item.id}" data-index="${index}">X</a></td>
    `;
    list.appendChild(row);
  });
}

function flushCar() {
  cartItems = [];
  renderCart();
}

function deleteFromCart(e) {
  if (e.target.classList.contains("delete")) {
    const index = e.target.getAttribute("data-index");
    cartItems.splice(index, 1);
    renderCart();
  }
}
