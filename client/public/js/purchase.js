document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
    addEventListeners();
  });
  
  function addEventListeners() {
    document.getElementById("flush-car-shop").addEventListener("click", flushCar);
    document.getElementById("purchase-btn").addEventListener("click", placeOrder);
  }
  
  function loadCartItems() {
    fetch("/items")
      .then((response) => response.json())
      .then((data) => {
        const cartItems = data.cart.items;
        const cartTableBody = document.querySelector("#shop-list tbody");
        cartTableBody.innerHTML = ""; // Clear existing content
  
        cartItems.forEach((item, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td><img src="../uploads/${item.product.image}" width="100" /></td>
            <td>${item.product.name}</td>
            <td>${item.product.price}</td>
            <td><a href="#" class="delete" data-index="${index}">X</a></td>
          `;
          cartTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los elementos del carrito:", error);
      });
  }
  
  function flushCar() {
    
  }
  
  function placeOrder() {

  }
  
