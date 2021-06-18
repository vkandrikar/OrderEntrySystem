const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const morgan = require("morgan");

const rootResolvers = require("./graphql/resolvers/index");
const db = require("./database/index");

const app = express();
const serverPort = process.env.SERVER_PORT || 8900;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Authosization");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST");
    return res.sendStatus(200);
  }
  next();
});

app.use("/orderentrysystem", graphqlHTTP({
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
      orders(order_id: Int = null, customer_name: String = null, is_items: Boolean = false): [Order!]
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
  `),
  rootValue: rootResolvers,
  graphiql: true
}));

//if no matching routes are available
app.use((req, res, next) => {
  const err = new Error("URL not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
  next();
});

const init = async () => {
  const dbConn = await db.fnConnect();

  if (dbConn === "connected") {
    app.listen(serverPort, () => {
      console.log(`App started on port ${serverPort}`);
    })
  } else {
    throw new Error("Issue while connecting database: "+dbConn);
  }
}

try {
  init();
} catch(err) {
  console.log(err);
}