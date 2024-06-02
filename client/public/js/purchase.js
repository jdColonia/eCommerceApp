document.addEventListener("DOMContentLoaded", () => {
  addEventListeners();
  loadCartItems();
  renderCartItems();
});

function addEventListeners() {
  document.getElementById("flush-car-shop").addEventListener("click", flushCar);
  document.getElementById("purchase-btn").addEventListener("click", placeOrder);
  document.querySelector(".close").addEventListener("click", closePopup);

  document.querySelector("#shop-list-order tbody").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      event.preventDefault();
      const index = event.target.getAttribute("data-index");
      deleteCartItem(index);
    }
  });
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
      <td>$${item.price}</td>
      <td>${item.quantity}</td>
      <td><a href="#" class="delete" data-index="${index}">X</a></td>
    `;
    cartTableBody.appendChild(row);
  });
}

function flushCar() {
  cartItems = [];
  sessionStorage.removeItem("cartItems");
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
        sessionStorage.removeItem("cartItems");
        renderCartItems();
      } else {
        alert("Error al realizar el pedido");
      }
    })
    .catch((error) => {
      console.error("Error al realizar el pedido:", error);
    });
}

function formatItemsTable(items) {
  return `
    <table>
      <tr>
        <th>Producto</th>
        <th>Cantidad</th>
      </tr>
      ${items
        .map(
          (item) => `
        <tr>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
        </tr>
      `
        )
        .join("")}
    </table>
  `;
}

function showInvoice(order) {
  document.getElementById("invoice-id").innerHTML = `<strong>Número de pedido:</strong> ${order.id}<br>`;
  document.getElementById("invoice-name").innerHTML = `<strong>Nombre:</strong> ${order.customer}<br>`;
  document.getElementById("invoice-date").innerHTML = `<strong>Fecha:</strong> ${new Date(
    order.date
  ).toLocaleString()}<br>`;
  document.getElementById("invoice-order").innerHTML = `<strong>Orden:</strong><br>${formatItemsTable(
    order.items
  )}<br>`;
  document.getElementById("invoice-total").innerHTML = `<strong>Total:</strong> $${order.total.toFixed(2)}<br>`;

  document.getElementById("invoice-popup").style.display = "block";
}

function closePopup() {
  document.getElementById("invoice-popup").style.display = "none";
  window.location.href = "/";
}

function deleteCartItem(index) {
  cartItems.splice(index, 1);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
}
