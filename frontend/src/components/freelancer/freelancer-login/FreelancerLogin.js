import React, { /* useContext, */ useRef } from "react";
import "./freelancerLogin.scss";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../../graphQL/Mutations";
// import { MyContext } from "../../../Context/Context";

export default function FreeLancerLogin() {
  const formRef = useRef();

  const [loginUser, { loading, error, data }] = useMutation(USER_LOGIN);
  console.log(data);

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
