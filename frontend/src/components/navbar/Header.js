<<<<<<< HEAD
import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import avatar from "../../assets/img/avatar.svg";
import logo from "../../assets/img/logo.svg";
import { AiOutlineLogin } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../../styles/navbar.scss";

export default function Header() {
  return (
    <Navbar bg="primary" variant={"dark"} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            alt=""
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{" "}
          Staff Room
        </Navbar.Brand>
=======
import React from 'react';
import {Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import avatar from '../../assets/img/avatar.svg';
import logo from '../../assets/img/logo.svg';
import { AiOutlineLogin } from 'react-icons/ai';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../../styles/header.scss'



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
      Staff Room
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">

      <Nav className="mx-auto TopHeader ">
      <Nav.Link as={Link} to="/home" > Jobs </Nav.Link>

        <NavDropdown title={<span><AiOutlineLogin/> Freelancers </span>}  id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/freelancer-login" >Freelancer Login</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/freelancer-signUp" > Freelancer SignUp</NavDropdown.Item>
        </NavDropdown>

        <span className="DisappearI text-light mt-1"> <BsPersonFill/></span>


        <NavDropdown title={<span><AiOutlineLogin/> Employer </span>}  id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/company-login" >Employer Login</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/company-signUp" > Employer SignUp</NavDropdown.Item>
        </NavDropdown>
>>>>>>> c4b8f8085e9a16ae5e8e3d09d3fadb5986083132

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto TopHeader ">
            <Nav.Link as={Link} to="/home">
              {" "}
              Jobs{" "}
            </Nav.Link>
            <NavDropdown
              title={
                <span>
                  <AiOutlineLogin /> Freelancers{" "}
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/freelancer-login">
                Freelancer Login
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/home">
                {" "}
                Freelancer SignUp
              </NavDropdown.Item>
            </NavDropdown>
            <span className="DisappearI text-light mt-1">
              {" "}
              <BsPersonFill />
            </span>
            <NavDropdown
              title={
                <span>
                  <AiOutlineLogin /> Employer{" "}
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/freelancer-login">
                Employer Login
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/home">
                {" "}
                Employer SignUp
              </NavDropdown.Item>
            </NavDropdown>
            <span className="DisappearI text-light mt-1">
              {" "}
              <HiOutlineOfficeBuilding />
            </span>
            <img
              className="ms-5 DisappearI"
              width="50"
              height="50"
              src={avatar}
              alt=""
            />{" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
