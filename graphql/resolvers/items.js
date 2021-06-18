const db = require("../../database/index");

module.exports = {
  items: async () => {
    const items = await db.fnGetItems();
    return items;
  },

  orderItems: async (args) => {
    const items = await db.fnGetOrderItems(args.order_id);
    return items;
  },

  sales: async () => {
    const items = await db.fnSalesData();
    return items;
  }
}