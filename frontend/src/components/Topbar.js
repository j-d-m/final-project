import React from 'react';
import {Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import logo from './logo.svg'
import { AiOutlineLogin } from 'react-icons/ai';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsPersonFill } from 'react-icons/bs';


export default function Topbar() {
  return (
  <Navbar bg="primary" variant={"dark"} expand="lg">
  <Container>
    <Navbar.Brand href="#home">
    <img
          alt=""
          src= {logo}
          width="40"
          height="40"
          className="d-inline-block align-top"
        />{' '}
      FreesBee GmbH
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">

      <Nav className="mx-auto TopHeader">
      <Nav.Link href="#link"> Home </Nav.Link>
      <Nav.Link href="#link"> Jobs </Nav.Link>

        <Nav.Link href="#link"> <HiOutlineOfficeBuilding/> For Employers</Nav.Link>


        <NavDropdown title={<span><AiOutlineLogin/> Login </span>}  id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Register</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Login for Employer</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#link"> <BsPersonFill/></Nav.Link>
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
