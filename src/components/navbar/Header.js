// Native import
import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
// import avatar from "../../assets/img/avatar-placeholder.png"; // Placeholder for avatar images if needed
import logo from "../../assets/img/logo.svg";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/header.scss";
import { MyContext } from "../../Context/Context";

/**
 * Header component renders the navigation bar with login/logout functionality for both freelancers and companies.
 * It uses React Bootstrap components for styling and structure, and includes context for managing login states.
 */
export default function Header() {
  const navigate = useNavigate();

  // Destructuring state and functions from context
  const {
    isCompanyLogin,
    isFreelancerLogin,
    setIsCompanyLogin,
    setIsFreelancerLogin,
    companyLoginData,
    freelancerLoginData,
  } = useContext(MyContext);

  /**
   * Function to handle company logout.
   * It updates the state to indicate the company is logged out, clears the token from localStorage, and navigates to the home page.
   */
  const companyLogout = () => {
    setIsCompanyLogin(false);
    localStorage.clear("token");
    navigate("/");
  };

  /**
   * Function to handle freelancer logout.
   * It updates the state to indicate the freelancer is logged out, clears the token from localStorage, and navigates to the home page.
   */
  const freelancerLogout = () => {
    setIsFreelancerLogin(false);
    localStorage.clear("token");
    navigate("/");
  };

  return (
    <Navbar
      bg="dark"
      variant={"dark"}
      expand="lg"
      id="goTop"
      className="m-0 p-1"
    >
      <Container>
        <Navbar.Brand as={Link} to="/home" className="m-0 p-0">
          <img
            alt=""
            src={logo}
            width="80"
            height="80"
            className="d-inline-block align-center navBarLogo"
          />
          <span className="ms-3">STAFF ROOM</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto TopHeader">
            {/* Conditional rendering of navigation links based on login status */}
            <Nav.Link as={Link} to="/home">
              Jobs
            </Nav.Link>

            {/* Conditional rendering of Freelancer login/logout and profile links */}
            {isFreelancerLogin ? (
              <NavDropdown
                title={
                  <span>
                    <AiOutlineLogin /> Freelancers
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
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
            ) : (
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
            )}

            {/* Conditional rendering of Company login/logout and profile links */}
            {isCompanyLogin ? (
              <NavDropdown
                title={
                  <span>
                    <AiOutlineLogin /> Employer
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <input
                  type="button"
                  value="Logout"
                  onClick={companyLogout}
                  className="logoutCompanyBtn ms-3"
                />
                <NavDropdown.Item as={Link} to="/company-profile">
                  Profile
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
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
            )}
          </Nav>

          {/* Conditional rendering of avatar images based on login status */}
          {isCompanyLogin ? (
            <img
              className="ms-5 DisappearI"
              width="60"
              height="60"
              src={companyLoginData?.avatar}
              alt="Company Avatar"
            />
          ) : isFreelancerLogin ? (
            <img
              className="ms-5 DisappearI"
              width="60"
              height="60"
              src={freelancerLoginData?.avatar}
              alt="Freelancer Avatar"
            />
          ) : (
            <img
              className="ms-5 DisappearI"
              width="60"
              height="60"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Default Avatar"
            />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
