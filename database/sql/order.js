module.exports = {
  select: 'SELECT * FROM `order` ORDER BY id DESC',

  count: 'SELECT COUNT(*) as total FROM `order`',

  selectByIdOrCustomer: 'SELECT * FROM `order` WHERE',

  selectDetails: 'SELECT o.*, i.id, i.code, i.description, i.rate, oi.quantity, oi.quantity * c.tax AS "tax" FROM `order` o JOIN `item` i JOIN `order_item` oi ON oi.item_id = i.id JOIN `item_category` c ON c.id = i.category_id WHERE (oi.order_id = ?) OR (o.customer_name = ?)',

  create: 'INSERT INTO `order` (`customer_name`, `customer_address`) VALUES (?, ?)',

  createAndShip: 'INSERT INTO `order` (`customer_name`, `customer_address`, `ship_date`, `gross_order_amount`, `total_tax`, `shipping_tax`, `total_order_amount`) VALUES (?, ?, ?, ?, ?, ?, ?)',

  deleteById: 'DELETE FROM `order` WHERE `id` = ?',

  patchOrder: 'UPDATE `order` SET `customer_name` = ?, `customer_address` = ? WHERE `id` = ?',

  updateOrder: 'UPDATE `order` SET `customer_name` = ?, `customer_address` = ?, `ship_date` = ?, `gross_order_amount` = ?, `total_tax` = ?, `shipping_tax` = ?, `total_order_amount` = ? WHERE `id` = ?'
}