import React from 'react';
import {Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import logo from './logo.svg'
import { AiOutlineLogin } from 'react-icons/ai';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom'


export default function Topbar() {
  return (
  <Navbar bg="primary" variant={"dark"} expand="lg">
  <Container>
    <Navbar.Brand href="/">
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
     <Link to = "/home"> <Nav.Link> Home </Nav.Link></Link> 
      <Link to='/job'> <Nav.Link> Job </Nav.Link></Link> 

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
