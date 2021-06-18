import React, { useState } from 'react'
import { Table, Modal } from 'react-bootstrap'

import homeStyle from '../../styles/home.module.css'
import { getOrderData } from './helper'
import OrderForm from '../placeOrder/orderForm'

export default function OrderTable({ orders }) {
  const [orderData, setOrderData] = useState(null)
  const fnDisplayOrderDetails = (order) => { setOrderData(order); }

  return (
    <>
      <Table responsive striped bordered hover varient="light" size="sm" className={homeStyle.orderTable}>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Order Id</th>
            <th>Order Date</th>
            <th>Customer Name</th>
            <th>Shipping date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            orders ?
              getOrderData(orders, fnDisplayOrderDetails)
              : null
          }
        </tbody>
      </Table>

      {
        orderData ?
          <Modal
            show={true}
            onHide={() => fnDisplayOrderDetails(null)}
            dialogClassName="modal-90w"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <OrderForm orderData={orderData} />
            </Modal.Body>
          </Modal>
          : null
      }
    </>
  )
}
