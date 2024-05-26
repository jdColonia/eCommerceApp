class Order {
  constructor(customer, items, total) {
    this.customer = customer;
    this.items = items;
    this.total = total;
    this.date = new Date();
  }
}

module.exports = Order;
