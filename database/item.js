
const { itemSql, orderItemSql } = require("./sql/index");

module.exports = {
	fnGetItems: async (dbConn) => {
		const [items] = await dbConn.execute(itemSql.selectWithTax);
		return items;
	},

	fnSalesData: async (dbConn) => {
		const [items] = await dbConn.execute(orderItemSql.sales);
		return items;
	}
}