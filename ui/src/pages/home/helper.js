import homeStyle from '../../styles/home.module.css'

export const headers = [
  { label: 'Order Id', key: 'id' },
  { label: 'Order Date', key: 'order_date' },
  { label: 'Ship Date', key: 'ship_date' },
  { label: 'Customer Name', key: 'customer_name' },
  { label: 'Customer Address', key: 'customer_address' },
  { label: 'Total Items', key: 'total_items' },
  { label: 'Gross Order Amount', key: 'gross_order_amount' },
  { label: 'Total Tax', key: 'total_tax' },
  { label: 'Shipping Tax', key: 'shipping_tax' },
  { label: 'Total Order Amount', key: 'total_order_amount' },
];

export const getExportData = (orderData) => {
  if (!orderData)
    return [];

  const result = orderData.map( order => {
    let data = Object.create(order);
    data["ship_date"] = data.ship_date ? (new Date(parseInt(data.ship_date))).toDateString() : ""
    data["order_date"] = data.order_date ? (new Date(parseInt(data.order_date))).toDateString() : "";
    data["total_items"] = order.items ? order.items.length : 0;
    return data;
  })

  return result;
}

export const getOrderData = (orders, clickHandler) => {
  const data = orders.map((order, key) => {
    let totalAmount = order.total_order_amount;
    if (totalAmount)
      totalAmount = totalAmount.toFixed(3);

    let shipDate = order.ship_date;
    if (shipDate) 
      shipDate = (new Date(parseInt(shipDate))).toDateString();
    
    return (
      <tr key={order.id} data-testid={`order-${order.id}`} className={homeStyle.tableRow} onDoubleClick={() => clickHandler(order)}>
        <td>{key+1}</td>
        <td>{order.id}</td>
        <td>{(new Date(parseInt(order.order_date))).toDateString()}</td>
        <td>{order.customer_name}</td>
        <td>{shipDate}</td>
        <td>{totalAmount}</td>
      </tr>
    )
  })

  return data;
}