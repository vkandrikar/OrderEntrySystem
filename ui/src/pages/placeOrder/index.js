import React from 'react'
import { Container} from 'react-bootstrap'

import OrderForm from './orderForm'

export default function PlaceOrder() {
  return (
    <Container fluid className="d-inline-block position-relative">
      <OrderForm action="placeOrder"/>
    </Container>
  )
}
