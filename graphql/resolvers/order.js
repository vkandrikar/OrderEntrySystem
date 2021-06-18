const db = require("../../database/index");

module.exports = {
  orders: async (args) => {
    const result = await db.fnGetOrders(args);
    return result;
  },

  placeOrder: async (args) => {
    const result = await db.fnPlaceUpdateOrder(args.orderInput);
    return result;
  },

  deleteOrder: async (args) => {
    const result = await db.fnDeleteOrder(args.order_id);
    return result;
  },

  updateOrder: async (args) => {
    const result = await db.fnPlaceUpdateOrder(args.orderInput);
    return result;
  }
}