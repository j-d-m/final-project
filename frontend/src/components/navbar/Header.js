import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import avatar from "../../assets/img/avatar.jpg";
import logo from "../../assets/img/logo.svg";
import { AiOutlineLogin } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../../styles/header.scss";
import { MyContext } from "../../Context/Context";

export default function Header() {
  const {
    isCompanyLogin,
    isFreelancerLogin,
    setIsCompanyLogin,
    setIsFreelancerLogin,
  } = useContext(MyContext);

  const companyLogout = () => {
    setIsCompanyLogin(false);
    localStorage.clear("token");
  };
  const freelancerLogout = () => {
    setIsFreelancerLogin(false);
    localStorage.clear("token");
  };
  return (
    <Navbar bg="dark" variant={"dark"} expand="lg" id="goTop">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            alt=""
            src={logo}
            width="42"
            height="42"
            className="d-inline-block align-top"
          />
          STAFF ROOM{" "}
          <p className="slogan-text"> GASTRONOMY JOBS / PEOPLE WHEN YOU NEED</p>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto TopHeader ">
            {isCompanyLogin ? (
              <Nav.Link as={Link} to="/home">
                Freelancer
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/home">
                Jobs
              </Nav.Link>
            )}
            {/* freelancer link start here */}
            {isFreelancerLogin ? (
              <>
                <NavDropdown
                  title={
                    <span>
                      <AiOutlineLogin /> Freelancers
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/freelancer-login">
                    <input
                      type="button"
                      value="Logout"
                      onClick={freelancerLogout}
                      className="logoutFreelancerBtn"
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/freelancer-profile">
                    Profile
                  </NavDropdown.Item>
                </NavDropdown>
                <span className="DisappearI text-light mt-1">
                  <BsPersonFill />
                </span>
              </>
            ) : (
              <>
                <NavDropdown
                  className={isCompanyLogin ? "d-none" : ""}
                  title={
                    <span>
                      <AiOutlineLogin /> Freelancers
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/freelancer-login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/freelancer-signUp">
                    SignUp
                  </NavDropdown.Item>
                </NavDropdown>
                <span
                  className={
                    isCompanyLogin
                      ? "DisappearI text-light mt-1 d-none"
                      : "DisappearI text-light mt-1"
                  }
                >
                  <BsPersonFill />
                </span>
              </>
            )}
            {/* company login start */}
            {isCompanyLogin ? (
              <>
                <NavDropdown
                  title={
                    <span>
                      <AiOutlineLogin /> Employer
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/">
                    <input
                      type="button"
                      value="Logout"
                      onClick={companyLogout}
                      className="logoutCompanyBtn"
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/company-profile">
                    Profile
                  </NavDropdown.Item>
                </NavDropdown>
                <span className="DisappearI text-light mt-1">
                  <HiOutlineOfficeBuilding />
                </span>
              </>
            ) : (
              <>
                <NavDropdown
                  className={isFreelancerLogin ? "d-none" : ""}
                  title={
                    <span>
                      <AiOutlineLogin /> Employer
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/company-login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/company-signUp">
                    SignUp
                  </NavDropdown.Item>
                </NavDropdown>
                <span
                  className={
                    isFreelancerLogin
                      ? "DisappearI text-light mt-1 d-none"
                      : "DisappearI text-light mt-1"
                  }
                >
                  <HiOutlineOfficeBuilding />
                </span>
              </>
            )}
          </Nav>
          <img
            className="ms-5 DisappearI"
            width="50"
            height="50"
            src={avatar}
            alt=""
          />{" "}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
