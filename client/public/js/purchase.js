document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
    addEventListeners();
  });
  
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
  
  function flushCar() {
    localStorage.removeItem('cartItems');
    loadCartItems();
  }
  
  function placeOrder() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert('No hay productos en el carrito para realizar la compra');
        return;
    }

    fetch('/placeOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert('Compra realizada con éxito');
            showInvoice(data.order);
            localStorage.removeItem('cartItems');
            loadCartItems();
        }
    })
    .catch(error => console.error('Error al realizar la compra:', error));
}

function showInvoice(order) {
  // Mostrar la información de la factura
  document.getElementById("invoice-name").textContent = `Nombre: ${order.customer}`;
  document.getElementById("invoice-date").textContent = `Fecha: ${new Date(order.date).toLocaleString()}`;
  document.getElementById("invoice-order").textContent = `Orden: ${order.items.map(item => item.title).join(", ")}`;
  document.getElementById("invoice-total").textContent = `Total: $${order.total.toFixed(2)}`;

  // Mostrar la ventana emergente de la factura
  document.getElementById("invoice-popup").style.display = "block";
}

function closePopup() {
  document.getElementById("invoice-popup").style.display = "none";
}
  
