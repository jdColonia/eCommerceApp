function loadOrderHistory() {
  // Se obtiene el historial de pedidos del almacenamiento local del navegador y se convierte a un objeto JavaScript.
  // Si no hay historial de pedidos, se inicializa como un array vacío.
  const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
  //Selecciona el cuerpo de la tabla del historial de pedidos
  const historyTableBody = document.querySelector("#order-history tbody");
  // Limpia el contenido existente del cuerpo de la tabla
  historyTableBody.innerHTML = ""; // Limpiar contenido existente

  orderHistory.forEach((order, index) => {
    order.items.forEach(item => {
      const row = document.createElement("tr");
      // Establece el contenido de la fila con información del artículo del pedido
      row.innerHTML = `
        <td><img src="${item.image}" width="100" /></td>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${index + 1}</td> <!-- Número de pedido -->
      `;
      historyTableBody.appendChild(row);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadOrderHistory();
});
