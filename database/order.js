
const { orderSql, itemSql, orderItemSql } = require("./sql/index");
const orderItem = require("./orderItem");

module.exports = {
	fnGetOrders: async (dbConn, args) => {
		let result;
		if (args.order_id === null && (args.customer_name === null || args.customer_name === "null")) {
			const [orders] = await dbConn.execute(orderSql.select);
			result = orders;
		}
		else if (args.order_id !== null || args.customer_name !== null) {
			//const [orders] = await dbConn.execute(orderSql.selectByIdOrCustomer, [args.order_id, args.customer_name]);
			const query = `${orderSql.selectByIdOrCustomer} (id = ${args.order_id}) OR (customer_name LIKE "%${args.customer_name}%")`;
			//console.log(query)
			const [orders] = await dbConn.execute(query);
			result = orders;
		}
		
		if (result.length > 0 && args.is_items) {
			const ids = result.map(order => order.id);
			const [itemsData] = await dbConn.execute(itemSql.selectDetails + "(" + ids.join(",") + ")");

			var filterData = itemsData.reduce(function (accum, item) {
				if (accum[item.order_id] === undefined)
					accum[item.order_id] = [];
				accum[item.order_id].push(item);
				return accum;
			}, {});

			const finalResult = result.map(order => (
				{
					...order,
					items: filterData[order.id]
				}
			));
			result = finalResult;
		}
		return result;
	},

	fnPlaceUpdateOrder: async (dbConn, args) => {
		//console.log(args);
		try {
			let order, query;
			if (args.order_type === 1) {
				if(args.id) {
					const [result] = await dbConn.execute(orderSql.patchOrder, [args.customer_name, args.customer_address, args.id]);
					order = result;
				} else {
					const [result] = await dbConn.execute(orderSql.create, [args.customer_name, args.customer_address]);
					order = result;
				}
			} else if (args.order_type === 2) {
				 //console.log("-------");
				var targetDate = new Date();
				targetDate.setDate(targetDate.getDate() + 10);
				const shippingDate = targetDate.toISOString().slice(0, 10);
				//console.log(shippingDate);
				var itemData = args.items.reduce(function (accum, item) {
					if (accum[item.id] === undefined) {
						accum[item.id] = [];
						accum[item.id]["quantity"] = [];
					}
					if (accum["ids"] === undefined) {
						accum["ids"] = [];
					}
					accum["ids"].push(item.id);
					accum[item.id]["quantity"].push(item.quantity);
					return accum;
				}, {});
				//console.log(itemSql.selectRateAndTax+ "(" + itemData["ids"].join(",") + ")");
				const [itemResult] = await dbConn.execute(itemSql.selectRateAndTax + "(" + itemData["ids"].join(",") + ")");
				//console.log(itemResult);

				var calculatedData = itemResult.reduce(function (accum, item) {
					const quantity = itemData[item.id]["quantity"];
					const tax = (quantity * item.tax);
					const grossAmount = (quantity * item.rate) + tax;
					const shippingTax = parseFloat((grossAmount * 0.165).toFixed(3));
					accum[0] = grossAmount;
					accum[1] = tax;
					accum[2] = shippingTax;
					accum[3] = grossAmount + shippingTax;

					return accum;
				}, {});

				if(args.id) {
					const [result] = await dbConn.execute(orderSql.updateOrder, [args.customer_name, args.customer_address, shippingDate, calculatedData[0], calculatedData[1], calculatedData[2], calculatedData[3], args.id]);
					order = result;
				} else {
					const [result] = await dbConn.execute(orderSql.createAndShip, [args.customer_name, args.customer_address, shippingDate, calculatedData[0], calculatedData[1], calculatedData[2], calculatedData[3]]);
					order = result;
				}
			}

			//console.log(order);
			if (order.affectedRows !== 0 || order.insertId !== 0) {
				const orderId = args.id ? args.id : order.insertId;
				try {
					if(args.id) {
						const [assoOld] = await dbConn.execute(orderItemSql.delete, [args.id]);
					}
					
					const orderItems = args.items.map(item => {
						return [orderId, item.id, item.quantity];
					});

					const [asso] = await dbConn.execute(orderItemSql.create + "(" + orderItems.join(") ,(") + ")");
					if (asso) {
						if (args.id)
							return `Order ${orderId} updated successfully`;
						else
							return `Order created successfully. Order id: ${orderId}`;
					} else {
						//delete new order
						throw new Error(`Issue while  ${args.id ? "updating" : "creating"}  order items`);
					} 
				} catch (err) {
					//delete new order
					throw new Error(`Issue while  ${args.id ? "updating" : "creating"}  order: ${err.message}`);
				}
			} else {
				throw new Error(`Unable to  ${args.id ? "update" : "create"}  order`);
			}
		} catch (err) {
			throw new Error(`Unable to  ${args.id ? "update" : "create"}  order: ${err.message}`);
		}
	},

	fnDeleteOrder: async (dbConn, id) => {
		try {
			const [result] = await dbConn.execute(orderSql.deleteById, [id]);
			return `Order ${id} deleted`;
		} catch (err) {
			throw new Error("Unable to delete record: " + err.message)
		}
	},
}