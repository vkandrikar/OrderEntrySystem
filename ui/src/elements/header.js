import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Row, Navbar, Nav } from 'react-bootstrap'

import headerStyle from '../styles/header.module.css'

export default function Header() {
  const location = useLocation();
  const { pathname } = location;
  const currentPage = pathname.split("/")[1];
  
  return (
    <Row className={headerStyle.header}>
      <Navbar bg="light" expand="lg">
        <Link to={{ pathname: "/home", data: null}}>
          <Navbar.Brand>Order Entry System</Navbar.Brand>
        </Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{marginLeft: "auto"}}>
            <Link to={{ pathname: "/home" }} className={`p-2 ${currentPage === "home" ? "active" : ""}`}>Home</Link>
            <Link to={{ pathname: "/order" }} className={`p-2 ${currentPage === "order" ? "active" : ""}`}>Place Order</Link>
            <Link to={{ pathname: "/stats" }} className={`p-2 ${currentPage === "stats" ? "active" : ""}`}>Stats</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Row>
  )
}
