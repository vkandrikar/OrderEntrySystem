import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Modal, Alert, Spinner } from 'react-bootstrap'

import Items from './items'
import { getItems, placeOrder, deleteOrder, updateOrder, resetOrderData, resetSalesData } from '../../redux/index'
import BodyOverlay from '../../elements/overlay'
import { getFormData, setDefaultItems, mergeArrayObjects, validateFormData } from './helper'
import FormFields from './formFields'

function OrderForm({ storeData, fetchItems, placeOrder, orderData, action, deleteOrder, updateOrder, resetOrder, resetSales }) {
  const [showItems, seThowItems] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [selectedItems, setSelectedItems] = useState(orderData ? orderData.items : []);
  const [formAction, setFormAction] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (storeData.item.items && !storeData.item.items.items)
      fetchItems();
  }, []);

  const toggleModel = () => seThowItems(!showItems);
  const updateItems = (items) => {
    const mergeredData = mergeArrayObjects(selectedItems, items);
    setSelectedItems(mergeredData);
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    
    if (formAction === "Delete Order") {
      setShowSuccessMsg(true);
      deleteOrder(orderData.id);
    } else {
      const formData =  getFormData(evt, formAction, selectedItems);

      const formDataErrors = validateFormData(formData);
      if (Object.keys(formDataErrors).length > 0) {
        setErrors(formDataErrors);
      } else {
        setShowSuccessMsg(true);
        if (orderData && orderData.id) {
          formData.id = orderData.id;
          updateOrder(formData);
        } else {
          placeOrder(formData);
        }
      }
    }
  }

  const handleSuccessClose = () => {
    setSelectedItems([]);
    setDefaultItems([]);
    setErrors({});
    setShowSuccessMsg(false);
  }

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
                      <Button variant="secondary" onClick={() => {resetOrder(); resetSales(); handleSuccessClose()}}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  :
                  null
              }
              <Form onSubmit={handleFormSubmit}>
                <FormFields 
                  orderData = {orderData}
                  errors = {errors}
                  action = {action}
                  selectedItems = {selectedItems}
                  toggleModel = {toggleModel}
                  setFormAction = {setFormAction}
                />
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
    deleteOrder: (id) => dispatch(deleteOrder(id)),
    resetOrder: () => dispatch(resetOrderData()),
    resetSales: () => dispatch(resetSalesData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
