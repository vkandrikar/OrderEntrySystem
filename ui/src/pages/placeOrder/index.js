import React from 'react'
import { Jumbotron, Container, Row, Col, Form, FormControl, Alert, Spinner } from 'react-bootstrap'

import OrderForm from './orderForm'

export default function PlaceOrder() {
  return (
    <Container fluid className="d-inline-block position-relative">
      <OrderForm action="placeOrder"/>
    </Container>
  )
}
