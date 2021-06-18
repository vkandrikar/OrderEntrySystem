var mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const { host, user, password, port, database } = require("./config");
const { fnGetOrders, fnPlaceUpdateOrder, fnDeleteOrder } = require('./order');
const { fnGetItems, fnSalesData } = require('./item');
const { fnGetOrderItems } = require('./orderItem');

let dbConn = null;

module.exports = {
	fnConnect: async () => {
		try {
			dbConn = await mysql.createConnection({
				host,
				user,
				password,
				port,
				database,
				Promise: bluebird
			});

			return "connected";
		} catch (err) {
			return err.message;
		}
	},

	fnGetOrders: async (args) => {
		return await fnGetOrders(dbConn, args);
	},

	fnPlaceUpdateOrder: async (args) => {
		return await fnPlaceUpdateOrder(dbConn, args);
	},

	fnDeleteOrder: async (id) => {
		return await fnDeleteOrder(dbConn, id);
	},

	fnGetItems: async () => {
		return await fnGetItems(dbConn);
	},

	fnGetOrderItems: async (orderId) => {
		return await fnGetOrderItems(dbConn, orderId);
	},

	fnSalesData: async () => {
		return await fnSalesData(dbConn);
	}
}