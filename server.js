const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const morgan = require("morgan");

const { schema } = require('./graphql/schema/index');
const rootResolvers = require("./graphql/resolvers/index");

const app = express();

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
  schema: schema,
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

module.exports = app;
