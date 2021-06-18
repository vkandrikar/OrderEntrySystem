import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Col, Row, Modal, ButtonGroup, Alert, Spinner } from 'react-bootstrap'

import ItemTable from './itemTable'
import Items from './items'
import { getItems, placeOrder, deleteOrder, updateOrder } from '../../redux/index'
import BodyOverlay from '../../elements/overlay'
import { getFormData, setDefaultItems, mergeArrayObjects } from './helper'

function OrderForm({ storeData, fetchItems, placeOrder, orderData, action, deleteOrder, updateOrder }) {
  const [showItems, seThowItems] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [selectedItems, setSelectedItems] = useState(orderData ? orderData.items : []);
  const [formAction, setFormAction] = useState("");

  useEffect(() => {
    setDefaultItems([]);
    fetchItems();
  }, []);

  const toggleModel = () => seThowItems(!showItems);
  const updateItems = (items) => {
    //console.log(selectedItems);
    //console.log(items);
    const mergeredData = mergeArrayObjects(selectedItems, items);
    //console.log(mergeredData);
    setSelectedItems(mergeredData);
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    //console.log(formAction);
    setShowSuccessMsg(true);
    if (formAction === "Delete Order") {
      //console.log(orderData);
      deleteOrder(orderData.id);
    } else {
      if (orderData && orderData.id) {
        updateOrder(getFormData(evt, formAction, selectedItems, orderData.id));
      } else {
        placeOrder(getFormData(evt, formAction, selectedItems));
      }
    }
  }

  const handleSuccessClose = () => {
    setSelectedItems([]);
    setShowSuccessMsg(false);
  }

  //console.log(itemList, error, loading);
  console.log("***ORDER FORM***")
  console.log(selectedItems)
  console.log(storeData.order.orderMsg)
  return (
    <Row className="my-2 p-2 border rounded">
      {
        storeData.item.loading || storeData.item.items.length === 0 || storeData.order.loading ?
          <BodyOverlay><Spinner animation="border" variant="info" /></BodyOverlay>
          :
          storeData.item.error || storeData.order.error ?
            <Alert variant="danger" className="my-2">
              <Alert.Heading>Error:</Alert.Heading>
              <p>
                {
                  storeData.item.error !== "" ?
                    storeData.item.error
                    :
                    storeData.order.error
                }
              </p>
            </Alert>
            :
            <>
              {
                (storeData.order.orderMsg && storeData.order.orderMsg !== "") && showSuccessMsg ?
                  <Modal show={showSuccessMsg} onHide={null}>
                    <Modal.Body>
                      {
                        storeData.order.orderMsg[Object.keys(storeData.order.orderMsg)[0]]
                      }
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => handleSuccessClose()}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  :
                  null
              }
              <Form onSubmit={handleFormSubmit}>
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
                    <Form.Control type="text" placeholder="John Mathew" name="customer_name" defaultValue={orderData ? orderData.customer_name : ""} readOnly={orderData && orderData.ship_date ? true : false} />
                  </Form.Group>

                  <Form.Group as={Col} xs="12" sm="6" controlId="customerAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="1st Avenue, Florida" name="customer_address" defaultValue={orderData ? orderData.customer_address : ""} readOnly={orderData && orderData.ship_date ? true : false} />
                  </Form.Group>
                </Row>

                <Row className="mx-0 mt-2 p-2 border rounded">
                  <Col md={2}><Form.Label>Item Details</Form.Label></Col>
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

              </Form>

              <Items
                show={showItems}
                onHide={toggleModel}
                togglemodel={toggleModel}
                updateitems={updateItems}
                itemlist={storeData.item.items}
                existingItems={selectedItems}
              />
            </>
      }
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    storeData: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => dispatch(getItems()),
    placeOrder: (args) => dispatch(placeOrder(args)),
    updateOrder: (args) => dispatch(updateOrder(args)),
    deleteOrder: (id) => dispatch(deleteOrder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
