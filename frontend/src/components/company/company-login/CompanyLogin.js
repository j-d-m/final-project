import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { COMPANY_LOGIN } from "../../../graphQL/Mutations";

import { MyContext } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

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
      console.log(res.data);
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

      // if (error) {
      //   Swal.fire({
      //     position: "top",
      //     icon: "error",
      //     title: ` ${error}`,
      //     showConfirmButton: false,
      //     timer: 1000,
      //     customClass: "swal-width",
      //   });
      // }
    });
  };

  return (
    <div className="container company-login">
      <h1 className="company-login-header">Employer Login</h1>
      <form onSubmit={companyLogin}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
