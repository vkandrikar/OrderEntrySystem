
const { itemSql,  } = require("./sql/index");

module.exports = {
  fnGetOrderItems: async (dbConn, orderId) => {
		const [items] = await dbConn.execute(itemSql.selectDetails, [orderId]);
		return items;
	} 
}