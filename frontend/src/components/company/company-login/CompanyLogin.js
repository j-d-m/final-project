import React, { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { COMPANY_LOGIN } from "../../../graphQL/Mutations";
import "../../../styles/companyLogin.scss";
import { MyContext } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";

import Swal from "sweetalert2";

export default function CompanyLogin() {
  const formRef = useRef();
  const navigate = useNavigate();
  const { companyLoginData, setCompanyLoginData } = useContext(MyContext);

  //submit function
  const [loginCompany, { loading, error, data }] = useMutation(COMPANY_LOGIN);
  // const [loginCompany, { loading, error, data }] = useMutation(COMPANY_LOGIN, {
  //   refetchQueries: [
  //     { query: GET_ONE_COMPANY, variables: { id: companyLoginData.companyId } },
  //   ],
  //   awaitRefetchQueries: true,
  // });

  const companyLogin = (e) => {
    e.preventDefault();

    loginCompany({
      variables: {
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      },
    }).then((res) => {
      setCompanyLoginData(res.data.loginCompany);
      if (companyLoginData) {
        navigate("/");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1000,
          customClass: "swal-width",
        });
      }
    });
  };

  if (error) return `${error.message}`;
  console.log(data, "data");
  console.log(companyLoginData);

  return (
    <div className="container company-login">
      <h1 className="company-login-header">Employer Login</h1>
      <form onSubmit={companyLogin} ref={formRef}>
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
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </div>
  );
}
