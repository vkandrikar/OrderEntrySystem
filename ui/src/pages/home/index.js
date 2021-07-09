import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'debounce'
import { CSVLink } from "react-csv"
import { Container, Row, Col, Form, FormControl, Alert, Spinner, Button, Modal } from 'react-bootstrap'

import homeStyle from '../../styles/home.module.css'
import { getOrders, resetOrderData, resetSalesData } from '../../redux/index'
import OrderTable from './orderTable'
import BodyOverlay from '../../elements/overlay'
import { headers, getExportData } from './helper'

function Home({ data, fetchOrders, resetOrders, resetSales }) {
  useEffect(() => {
    if (!data.order.orders?.orders?.data)
      fetchOrders();
  }, [])

  const searchData = debounce((pattern) => {
    let args = { orderId: null, customerName: null };

    if (pattern.length !== 0) {
      pattern = pattern.trim();
      if (pattern !== "") {
        if (isNaN(pattern)) {
          args.orderId = null;
          args.customerName = pattern;
        } else {
          args.orderId = pattern;
          args.customerName = null;
        }
        fetchOrders(args);
      }
    } else {
      fetchOrders(args);
    }
  }, 500);

  //console.log("HOME");
  //console.log((data.order.orders?.orders?.data));
  return (
    <Container fluid className="d-inline-block position-relative">
      <Row className="p-1 my-2">
        <Form.Group as={Col} md={{ span: 2, offset: 6 }} controlId="orderId" className="text-end">
          <Button variant="success">
            <CSVLink data={getExportData(data.order.orders?.orders?.data)} headers={headers} className={homeStyle.csvBtn}>
              Export Data
            </CSVLink>
          </Button>
        </Form.Group>

        <Form.Group as={Col} controlId="orderDate" className={homeStyle.searchBox}>
            <FormControl type="text" placeholder="Search by order id or customer name" className="mr-sm-2" onChange={(evt) => searchData(evt.target.value)} />
        </Form.Group>
      </Row>
      {
        data.order.loading ?
          <BodyOverlay><Spinner animation="border" variant="info" /></BodyOverlay>
          :
          data.order.error ?
            <Alert variant="danger" className="m-5">
              <Alert.Heading>Error:</Alert.Heading>
              <p>
                {data.order.error}
              </p>
            </Alert>
            :
            <>
              {
                (data.order.orderMsg && data.order.orderMsg !== "") ?
                  <Modal show={true} onHide={null}>
                    <Modal.Body>
                      {
                        data.order.orderMsg[Object.keys(data.order.orderMsg)[0]]
                      }
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => {resetOrders(); resetSales();}}>
                        Close
                    </Button>
                    </Modal.Footer>
                  </Modal>
                  :
                  null
              }
              <Row className={`${homeStyle.wrapper} p-2 pt-4`}>
                <OrderTable orders={data.order.orders?.orders?.data} />
              </Row>
            </>
      }

    </Container >
  )
}

const mapStateToProps = (state) => {
  //console.log("---HOME mapStateToProps---");
  //console.log(state);
  return {
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (args) => dispatch(getOrders(args)),
    resetOrders: () => dispatch(resetOrderData()),
    resetSales: () => dispatch(resetSalesData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);