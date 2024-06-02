document.addEventListener("DOMContentLoaded", () => {
  addEventListeners();
  loadCartItems();
  renderCartItems();
});

function addEventListeners() {
  document.getElementById("flush-car-shop").addEventListener("click", flushCar);
  document.getElementById("purchase-btn").addEventListener("click", placeOrder);
  document.querySelector(".close").addEventListener("click", closePopup);
}

function loadCartItems() {
  const storedCartItems = sessionStorage.getItem("cartItems");
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
  }
}

function renderCartItems() {
  const cartTableBody = document.querySelector("#shop-list-order tbody");
  cartTableBody.innerHTML = "";

  cartItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" width="100" /></td>
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td>${item.quantity}</td>
      <td><a href="#" class="delete" data-index="${index}">X</a></td>
    `;
    cartTableBody.appendChild(row);
  });
}

function flushCar() {
  cartItems = [];
  renderCartItems();
}

function placeOrder() {
  if (cartItems.length === 0) {
    alert("No hay productos en el carrito para realizar la compra");
    return;
  }

  const username = sessionStorage.getItem("User") || "Invitado";

  fetch("/placeOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, cartItems }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showInvoice(data.order);
        cartItems = [];
        renderCartItems();
      } else {
        alert("Error al realizar el pedido");
      }
    })
    .catch((error) => {
      console.error("Error al realizar el pedido:", error);
    });
}

function showInvoice(order) {
  document.getElementById("invoice-id").textContent = `Número de pedido: ${order.id}`;
  document.getElementById("invoice-name").textContent = `Nombre: ${order.customer}`;
  document.getElementById("invoice-date").textContent = `Fecha: ${new Date(order.date).toLocaleString()}`;
  document.getElementById("invoice-order").textContent = `Orden: ${order.items
    .map((item) => `${item.title} x${item.quantity}`)
    .join(", ")}`;
  document.getElementById("invoice-total").textContent = `Total: $${order.total.toFixed(2)}`;

  document.getElementById("invoice-popup").style.display = "block";
}

function closePopup() {
  document.getElementById("invoice-popup").style.display = "none";
}
