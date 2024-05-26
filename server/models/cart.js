class Cart {
  constructor() {
    this.items = [];
  }

  // Agregar un producto al carrito
  addItem(product, quantity) {
    this.items.push({ product, quantity });
  }

  // Eliminar un producto del carrito por índice
  removeItem(index) {
    this.items.splice(index, 1);
  }

  // Limpiar el carrito de compras
  clearCart() {
    this.items.length = 0;
  }

  // Calcular el total del carrito
  getTotal() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }
}

module.exports = Cart;
