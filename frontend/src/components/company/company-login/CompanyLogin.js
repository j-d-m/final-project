import React, { useContext, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { COMPANY_LOGIN } from "../../../graphQL/Mutations";
import "../../../styles/companyLogin.scss";
import { MyContext } from "../../../Context/Context";
export default function CompanyLogin() {
  const formRef = useRef();
  const [loginCompany, { loading, error, data }] = useMutation(COMPANY_LOGIN);
  // 2
  const { companyLoginData, setCompanyLoginData } = useContext(MyContext);

  //submit function
  const companyLogin = (e) => {
    e.preventDefault();
    loginCompany({
      variables: {
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      },
    }).then((res) => {
      setCompanyLoginData(res.data.loginCompany);
    });
  };

  // if (loading) return <p>Loading...</p>;
  if (error) return `${error.message}`;
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
