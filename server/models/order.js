const { v4: uuidv4 } = require("uuid");

class Order {
  constructor(customer, items, total) {
    this.id = uuidv4();
    this.customer = customer;
    this.items = items;
    this.total = total;
    this.date = new Date();
  }
}

module.exports = Order;
