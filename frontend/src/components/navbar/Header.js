import React from 'react';
import {Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import logo from './logo.svg'
import { AiOutlineLogin } from 'react-icons/ai';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';



export default function Header() {
  return (
  <Navbar bg="primary" variant={"dark"} expand="lg">
  <Container>
    <Navbar.Brand as={Link} to="/home">
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
      <Nav.Link as={Link} to="/home" > Home </Nav.Link>
        <NavDropdown title={<span><AiOutlineLogin/> Login </span>}  id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/freelancer-login" >Freelancer Login</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/freelancer-profile" >Freelancer Profile</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/company-login" >Login for Employer</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={Link} to="/freelancer-profile" > <BsPersonFill/></Nav.Link>

       <Nav.Link as={Link} to="/company-profile"> Company Profile </Nav.Link>

        <Nav.Link as={Link} to="/company-login"> <HiOutlineOfficeBuilding/> For Employers</Nav.Link>


       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
