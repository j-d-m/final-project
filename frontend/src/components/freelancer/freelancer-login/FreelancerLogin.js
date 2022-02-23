import React, { useRef } from "react";
import "./freelancerLogin.scss";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../../graphQL/Mutations";

export default function FreeLancerLogin() {

  
  


  const formRef = useRef();

  const [loginUser, { loading,  error , data}] = useMutation(USER_LOGIN);
  console.log(data)

  //submit function
  const userLogin = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      },
    });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return `${error.message}`;

  return (
    <div className="container freelancer-login">
      <h1 className="freelancer-login-header">Freelancer Login</h1>
      <form onSubmit={userLogin} ref={formRef}>
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
