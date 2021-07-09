import { render, screen } from '@testing-library/react';
import OrderTable from './orderTable';

test('test draft order', () => {
  const data =
    [{
      "id": 1,
      "order_date": "1624538936000",
      "customer_name": "Nick asda",
      "customer_address": "NYK",
      "ship_date": null,
      "items": [{
        "id": 2,
        "code": "ite002",
        "description": "this is item2 from electronic categody",
        "rate": 300,
        "quantity": 2,
        "tax": 10
      }],
      "gross_order_amount": null,
      "total_tax": null,
      "shipping_tax": null,
      "total_order_amount": null
    }];

  render(<OrderTable orders={data} />);

  const orderEle = screen.getByTestId('order-1');
  expect(orderEle).toBeInTheDocument();
  const tds = orderEle.getElementsByTagName('td');
  expect(tds[4].hasChildNodes()).toBeFalsy();
});

test('test shipped order', () => {
  const data =
    [{
      "id": 1,
      "order_date": "1623998165000",
      "customer_name": "Nicknew",
      "customer_address": "NYK",
      "ship_date": "1624818600000",
      "items": [{
        "id": 2,
        "code": "ite002",
        "description": "this is item2 from electronic categody",
        "rate": 300,
        "quantity": 1,
        "tax": 5
      }, {
        "id": 4,
        "code": "ite004",
        "description": "this is item4 from clothing categody",
        "rate": 100,
        "quantity": 3,
        "tax": 10.5
      }],
      "gross_order_amount": 310.5,
      "total_tax": 10.5,
      "shipping_tax": 51.233001708984375,
      "total_order_amount": 361.7330017089844
    }];

  render(<OrderTable orders={data} />);

  const orderEle = screen.getByTestId('order-1')
  expect(orderEle).toBeInTheDocument();
  const tds = orderEle.getElementsByTagName('td');
  expect(tds[4].hasChildNodes()).toBeTruthy();

});