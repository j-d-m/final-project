import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { COMPANY_LOGIN } from "../../../graphQL/Mutations";
import "./companyLogin.scss";
export default function CompanyLogin() {
  const formRef = useRef();
  const [loginCompany, { loading, error }] = useMutation(COMPANY_LOGIN);

  //submit function
  const companyLogin = (e) => {
    e.preventDefault();
    loginCompany({
      variables: {
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      },
    });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return `${error.message}`;

  return (
    <div className="container company-login">
      <h1 className="company-login-header">Employer Login</h1>
      <form onSubmit={companyLogin} ref={formRef}>
        <div class="mb-3">
          <label for="exampleInputTex1" class="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            class="form-control"
            id="exampleInputTex1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword2" class="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            class="form-control"
            id="exampleInputPassword2"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </div>
  );
}
