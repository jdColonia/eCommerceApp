function loadOrderHistory() {
    fetch("/history")
      .then(response => response.json())
      .then(data => {
        const orders = data.orders;
        const historyTableBody = document.querySelector("#order-history tbody");
        historyTableBody.innerHTML = ""; // Limpiar contenido existente
  
        orders.forEach((order, index) => {
          order.cart.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td><img src="../uploads/${item.product.image}" width="100" /></td>
              <td>${item.product.name}</td>
              <td>${item.product.price}</td>
              <td>${index + 1}</td> <!-- Número de pedido -->
            `;
            historyTableBody.appendChild(row);
          });
        });
      })
      .catch(error => {
        console.error("Error al cargar el historial de pedidos:", error);
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/orderHistory.json')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('#order-history tbody');
        data.forEach(order => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><img src="../images/${order.image}" alt="${order.name}"></td>
            <td>${order.name}</td>
            <td>${order.price}</td>
            <td>${order.orderNumber}</td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(error => console.error('Error fetching order history:', error));
  });
  
  