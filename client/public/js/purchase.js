document.addEventListener("DOMContentLoaded", () => {
  loadCartItems();
  addEventListeners();
});
// Función para agregar event listeners a los elementos relevantes de la página
function addEventListeners() {
  document.getElementById("flush-car-shop").addEventListener("click", flushCar);
  document.getElementById("purchase-btn").addEventListener("click", placeOrder);
  document.querySelector(".close").addEventListener("click", closePopup);
}

function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartTableBody = document.querySelector("#shop-list-order tbody");
  cartTableBody.innerHTML = ""; // Clear existing content

  cartItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" width="100" /></td>
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td><a href="#" class="delete" data-index="${index}">X</a></td>
    `;
    cartTableBody.appendChild(row);
  });
}
// funcion para vaciar el carrito
function flushCar() {
  localStorage.removeItem('cartItems');
  loadCartItems();
}
//funcion para realizar un pedido con los elementos del carrito
function placeOrder() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  if (cartItems.length === 0) {
    alert('No hay productos en el carrito para realizar la compra');
    return;
  }
  // crea la orden basada en el carrito
  const order = {
    customer: "Invitado",
    date: new Date().toISOString(),
    items: cartItems,
    total: cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0)
  };

  // Guardar en el historial de pedidos
  const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
  orderHistory.push(order);
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

  // Mostrar la factura
  showInvoice(order);

  // Limpiar el carrito
  localStorage.removeItem('cartItems');
  loadCartItems();
}
//funcion para mostrar la factura con la informacion del pedido basada en lo comprado
function showInvoice(order) {
  document.getElementById("invoice-name").textContent = `Nombre: ${order.customer}`;
  document.getElementById("invoice-date").textContent = `Fecha: ${new Date(order.date).toLocaleString()}`;
  document.getElementById("invoice-order").textContent = `Orden: ${order.items.map(item => item.title).join(", ")}`;
  document.getElementById("invoice-total").textContent = `Total: $${order.total.toFixed(2)}`;

  document.getElementById("invoice-popup").style.display = "block";
}

function closePopup() {
  document.getElementById("invoice-popup").style.display = "none";
}
