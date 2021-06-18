module.exports = {
  select: 'SELECT * FROM `item`',

  selectByIds: 'SELECT * FROM `item` where `id` IN ',

  selectWithTax: 'SELECT i.id, i.code, i.description, i.rate, c.tax FROM `item` i JOIN `item_category` c ON c.id = i.category_id',

  selectDetails: 'SELECT i.id, i.code, i.description, i.rate, oi.quantity, oi.quantity * c.tax AS "tax", oi.order_id FROM `item` i JOIN `order_item` oi ON oi.item_id = i.id JOIN `item_category` c ON c.id = i.category_id WHERE oi.order_id IN ',

  selectRateAndTax: 'SELECT i.id, i.rate , c.tax FROM `item` i  JOIN `item_category` c ON c.id = i.category_id WHERE i.id in '
}