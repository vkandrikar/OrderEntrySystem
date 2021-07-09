import React from 'react'
import { Form, Button, Col, Row} from 'react-bootstrap'

import ItemTable from './itemTable'

export default function FormFields( {orderData, errors, action, selectedItems, toggleModel, setFormAction} ) {
  return (
    <>
      {orderData ?
        <Row className="mt-2">
          <Form.Group as={Col} xs="12" sm="4" controlId="orderId">
            <Form.Label>Order Id</Form.Label>
            <Form.Control type="text" readOnly defaultValue={orderData ? orderData.id : ""} />
          </Form.Group>

          <Form.Group as={Col} xs="12" sm="4" controlId="orderDate">
            <Form.Label>Order Date</Form.Label>
            <Form.Control type="text" readOnly defaultValue={orderData ? (new Date(parseInt(orderData.order_date))).toDateString() : ""} />
          </Form.Group>

          <Form.Group as={Col} xs="12" sm="4" controlId="shipDate">
            <Form.Label>Ship Date</Form.Label>
            <Form.Control type="text" readOnly defaultValue={orderData && orderData.ship_date ? (new Date(parseInt(orderData.ship_date))).toDateString() : ""} />
          </Form.Group>
        </Row>
        :
        null
      }

      <Row className="mt-2">
        <Form.Group as={Col} xs="12" sm="6" controlId="customerName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="John Mathew" name="customer_name" defaultValue={orderData ? orderData.customer_name : ""} readOnly={orderData && orderData.ship_date ? true : false} isInvalid={!!errors.name} />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs="12" sm="6" controlId="customerAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="1st Avenue, Florida" name="customer_address" defaultValue={orderData ? orderData.customer_address : ""} readOnly={orderData && orderData.ship_date ? true : false} isInvalid={!!errors.address} />
          <Form.Control.Feedback type="invalid">
            {errors.address}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mx-0 mt-2 p-2 border rounded">
        <Col md={2}>
          <Form.Label>Item Details</Form.Label>
          <Form.Control type="hidden" isInvalid={!!errors.items} />
          <Form.Control.Feedback type="invalid">
            {errors.items}
          </Form.Control.Feedback>
        </Col>
        {
          (orderData && orderData.ship_date === null) || action === "placeOrder" ?
            <Col md={{ span: 2, offset: 8 }} style={{ textAlign: "right" }}>
              <Button variant="primary" size="sm" onClick={() => { toggleModel() }}>Add</Button>
            </Col>
            :
            null
        }

        <ItemTable items={selectedItems} />
      </Row>

      {
        orderData ?
          <Row className="mt-2">
            <Form.Group as={Col} xs="12" sm="6" lg="3" controlId="grossOrderAmount">
              <Form.Label>Gross Order Amount</Form.Label>
              <Form.Control type="text" readOnly defaultValue={orderData ? orderData.gross_order_amount : ""} />
            </Form.Group>

            <Form.Group as={Col} xs="12" sm="6" lg="3" controlId="totalTax">
              <Form.Label>Total Tax</Form.Label>
              <Form.Control type="text" readOnly defaultValue={orderData ? orderData.total_tax : ""} />
            </Form.Group>

            <Form.Group as={Col} xs="12" sm="6" lg="3" controlId="shippingTax">
              <Form.Label>Shipping Tax</Form.Label>
              <Form.Control type="text" readOnly defaultValue={orderData && orderData.shipping_tax ? (orderData.shipping_tax).toFixed(3) : ""} />
            </Form.Group>

            <Form.Group as={Col} xs="12" sm="6" lg="3" controlId="totalOrderAmount">
              <Form.Label>Total Order Amount</Form.Label>
              <Form.Control type="text" readOnly defaultValue={orderData && orderData.total_order_amount ? (orderData.total_order_amount).toFixed(3) : ""} />
            </Form.Group>
          </Row>
          :
          null
      }
      {
        (orderData && orderData.ship_date === null) || action === "placeOrder" ?
          <div className="mt-2 text-center">
            {
              action !== "placeOrder" ?
                <>
                  <Button variant="danger" type="submit" onClick={() => { setFormAction("Delete Order") }}>
                    Delete Order
                  </Button>{' '}
                </>
                :
                null
            }
            <Button variant="primary" type="submit" onClick={() => { setFormAction("Save as Draft") }}>
              Save as Draft
            </Button>{' '}
            <Button variant="primary" type="submit" onClick={() => { setFormAction("Place Order") }}>
              Place Order
            </Button>
          </div>
          :
          null
      }
    </>
  )
}
