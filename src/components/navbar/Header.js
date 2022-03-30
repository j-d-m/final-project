import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
// import avatar from "../../assets/img/avatar-placeholder.png";
import logo from "../../assets/img/logo.svg";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/header.scss";
import { MyContext } from "../../Context/Context";

export default function Header() {
  const navigate = useNavigate();
  const {
    isCompanyLogin,
    isFreelancerLogin,
    setIsCompanyLogin,
    setIsFreelancerLogin,
    companyLoginData,
    freelancerLoginData,
  } = useContext(MyContext);

  const companyLogout = () => {
    setIsCompanyLogin(false);
    localStorage.clear("token");
    navigate("/");
  };
  const freelancerLogout = () => {
    setIsFreelancerLogin(false);
    localStorage.clear("token");
    navigate("/");
  };
  return (
    <Navbar bg="dark" variant={"dark"} expand="lg" id="goTop" className="m-0 p-1">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="m-0 p-0" >
          <img
            alt=""
            src={logo}
            width="80"
            height="80"
            className="d-inline-block align-center navBarLogo "
            hover path fill="red"
          />

          <span className="ms-3" >STAFF ROOM </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto TopHeader ">
            {isCompanyLogin ? (
              <Nav.Link as={Link} to="/home">
                Jobs
              </Nav.Link>
            ) : isFreelancerLogin ? (
              <Nav.Link as={Link} to="/home">
                Jobs
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
                ></span>
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
                  {/* <NavDropdown.Item> */}
                  {/* bootstrap component omitted to prevent bug happening with the company logout  */}
                  <input
                    type="button"
                    value="Logout"
                    onClick={companyLogout}
                    className="logoutCompanyBtn ms-3"
                  // ms-3 (margin-left: 3px) added to fix style after <NavDropdown.Item> was removed
                  />
                  {/* </NavDropdown.Item> */}
                  <NavDropdown.Item as={Link} to="/company-profile">
                    Profile
                  </NavDropdown.Item>
                </NavDropdown>
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
                ></span>
              </>
            )}
          </Nav>
          {isCompanyLogin ? (
            <img
              className="ms-5 DisappearI"
              width="60"
              height="60"
              src={companyLoginData?.avatar}
              alt="img"
            />
          ) : isFreelancerLogin ? (
            <img
              className="ms-5 DisappearI"
              width="60"
              height="60"
              src={freelancerLoginData?.avatar}
              alt="img"
            />
          ) : (
            <img
              className="ms-5 DisappearI"
              width="60"
              height="60"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="img"
            />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
