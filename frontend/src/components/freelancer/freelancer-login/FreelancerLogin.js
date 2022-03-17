import React, { useContext, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../../graphQL/Mutations";
import { MyContext } from "../../../Context/Context";
import swal from "sweetalert2";
import "../../../styles/LoginStyle.scss";
export default function FreeLancerLogin() {
  const navigate = useNavigate();
  const formRef = useRef();
  const { setIsFreelancerLogin, setFreelancerLoginData } =
    useContext(MyContext);
  const [loginUser, { loading, error, data }] = useMutation(USER_LOGIN);

  const userLogin = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      },
    }).then((res) => {
      if (res.data) {
        setFreelancerLoginData(res.data.loginUser.user);
        localStorage.setItem("token", res.data.loginUser.token);

        swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 2000,
          customClass: "swal-width",
        });
        setIsFreelancerLogin(true);
        navigate("/");
      }
    });
  };

  return (
    <div className=" CompanyLogin">
      <div className="FormContainer">
        <form onSubmit={userLogin} ref={formRef} className="CompanyLoginForm">
          <h1 className="CompanyLoginHeader">Freelancer Login</h1>
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
            <Link to="/freelancer-signUp">Sign Up</Link>
          </div>
        </form>
        <div className="FreelancerImageDiv"></div>
      </div>
    </div>
  );
}
