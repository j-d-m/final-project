import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { COMPANY_LOGIN } from "../../../graphQL/Mutations";
import { MyContext } from "../../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../styles/LoginStyle.scss";

export default function CompanyLogin() {
  const navigate = useNavigate();
  const { setCompanyLoginData, setIsCompanyLogin } = useContext(MyContext);
  const [loginCompany, { loading, error, data }] = useMutation(COMPANY_LOGIN);
  //submit function

  const companyLogin = (e) => {
    e.preventDefault();

    loginCompany({
      variables: {
        email: e.target.email.value,
        password: e.target.password.value,
      },
    }).then((res) => {
      if (res.data) {
        setCompanyLoginData(res.data.loginCompany.company);
        localStorage.setItem("token", res.data.loginCompany.token);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 2000,
          customClass: "swal-width",
        });
        setIsCompanyLogin(true);
        navigate("/company-profile");
      }
    });
  };
  if (error) {
    let errorMessage1 = error.message.split(",").splice(0, 1);
    let errorMessage2 = error.message.split(",").splice(1, 2);
    Swal.fire({
      position: "top",
      icon: "error",
      title: ` ${errorMessage1}
      ${errorMessage2}`,
      showConfirmButton: false,
      timer: 2000,
      customClass: "swal-width",
    });
  }

  return (
    <div className=" CompanyLogin">
      <div className="FormContainer">
        <form onSubmit={companyLogin} className="CompanyLoginForm">
          <h1 className="CompanyLoginHeader">Employer Login</h1>
          <div className="m-3 InputForm">
            <input
              name="email"
              type="email"
              className="form-control shadow-none"
              placeholder="Email"
            />
          </div>
          <div className="m-3 InputForm">
            <input
              name="password"
              type="password"
              className="form-control shadow-none"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
          <div className="goToSignUp">
            <p>You Dont Have Account ?</p>
            <Link to="/company-signUp">Sign Up</Link>
          </div>
        </form>
        <div className="imageDiv"></div>
      </div>
    </div>
  );
}
