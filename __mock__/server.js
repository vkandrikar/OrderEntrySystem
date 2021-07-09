const express = require("express");
const jsonGraphqlExpress = require('json-graphql-server');

const { items } = require('./db');

const PORT = 3000;
const app = express();

//app.use('/orderentrysystem', jsonGraphqlExpress(items));
app.get("/test", (req, res, next) => {
  res.status(200).json({"message": "success"});
});

app.listen(PORT, () => {
  console.log(`Test App started on port ${PORT}`);
})

module.exports = app;
