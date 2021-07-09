module.exports = {
  create: 'INSERT INTO `order_item` (`order_id`, `item_id`, `quantity`) VALUES ',
  select: 'SELECT `item_id` FROM `order_item` WHERE `order_id` = ?',
  delete: 'DELETE FROM `order_item` WHERE `order_id` = ?',
  sales: 'SELECT oi.item_id, i.code, sum(oi.quantity) as sale_count FROM order_item oi JOIN item i ON oi.item_id = i.id GROUP BY oi.item_id'
}