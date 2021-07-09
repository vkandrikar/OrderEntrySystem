const { buildSchema } = require('graphql');

module.exports = {
  schema: buildSchema(`
    type Item {
      id: Int!
      code: String!
      description: String!
      rate: Float!
      category_id: Int!
      quantity: Int
      tax: Float
    }

    type Order {
      id: Int!
      order_date: String!
      customer_name: String!
      customer_address: String!
      ship_date: String
      gross_order_amount: Float
      total_tax: Float
      shipping_tax: Float
      total_order_amount: Float
      items: [Item!]
    }

    type OrderData {
      total: Int!
      data: [Order!]
    }

    type Sale {
      item_id: Int!
      code: String!
      sale_count: Int!
    }

    input ItemInput {
      id: Int!
      quantity: Int!
    }

    input OrderInput {
      id: Int = null
      customer_name: String!
      customer_address: String!
      items: [ItemInput!]!
      order_type: Int = 2
    }

    type RootQuery {
      orders(order_id: Int = null, customer_name: String = null, is_items: Boolean = false): OrderData!
      items: [Item!]
      orderItems(order_id: Int!): [Item!]
      sales: [Sale!]
    }

    type RootMutation {
      placeOrder(orderInput: OrderInput!): String!
      deleteOrder(order_id: Int!): String!
      updateOrder(orderInput: OrderInput!): String!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `)
}