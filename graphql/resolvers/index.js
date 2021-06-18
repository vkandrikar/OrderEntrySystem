const orderResolver = require("./order");
const itemResolver = require("./items");

module.exports = {
  ...orderResolver,
  ...itemResolver
}