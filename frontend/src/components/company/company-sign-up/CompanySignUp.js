import { useMutation } from "@apollo/client";
import React from "react";
import Swal from "sweetalert2";
import "../../../styles/companySignUp.scss";
import logo from "../../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

import { CREATE_COMPANY_MUTATION } from "../../../graphQL/Mutations";

export default function CompanySignUp() {
  let navigate = useNavigate();
  const [addCompany, { data, loading, error }] = useMutation(
    CREATE_COMPANY_MUTATION
  );
  const formSubmitAddCompany = (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.repeatPassword.value) {
      return Swal.fire({
        position: "top",
        icon: "error",
        title: "Your passwords do not match",
        showConfirmButton: false,
        timer: 2000,
        customClass: "swal-width",
      });
    }

    addCompany({
      variables: {
        company_Name: e.target.company_Name.value,
        owner_name: e.target.owner_name.value,
        company_type: e.target.company_type.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        password: e.target.password.value,
        repeatPassword: e.target.repeatPassword.value,
        description: e.target.description.value,
      },
    }).then((res) => {
      console.log(res);
      if (
        res.data &&
        e.target.password.value === e.target.repeatPassword.value
      ) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Account Created",
          showConfirmButton: false,
          timer: 2000,
          customClass: "swal-width",
        });
        navigate("/company-profile");
      }
    });
  };

  // if (loading)
  //   return (
  //     <img
  //       src="https://cdn.dribbble.com/users/924068/screenshots/3757746/media/6035d641a7d26f1ba75421d15ce173cf.gif"
  //       alt="img"
  //     />
  //   );

  // Error handling needs to be reviewed: When there is an error it needs to show
  // Sweeet Alert and dont make the user loses everything he has entered so far

  if (error) {
    console.log("data", data);
    console.log("error", error);
    return `${error.message}`;
  }

  return (
    <>
      <section className="Company-sign-container">
        <div className="Wall-left bg-secondary">
          <div>
            <img src={logo} alt="signup logo" />
          </div>
        </div>

        <div className="signUp-form-right">
          <h2>Company Signup page</h2>

          <form className="form-style-5" onSubmit={formSubmitAddCompany}>
            <legend>
              Let's get you all set up to find the perfect freelancer !
            </legend>

            <label>
              <span>Company Name</span>
              <input
                type="text"
                name="company_Name"
                required
                maxLength="50"
                minLength="2"
              />
            </label>

            <label>
              <span>Owner/Manager Name</span>
              <input
                type="text"
                name="owner_name"
                required
                minLength="2"
                maxLength="50"
              />
            </label>
            <label>
              <span>Type of Business</span>
              <input
                type="text"
                name="company_type"
                required
                minLength="2"
                maxLength="20"
              />
            </label>

            <label>
              <span>Company Address</span>
              <input
                type="text"
                name="address"
                required
                minLength="2"
                maxLength="50"
              />
            </label>

            <label>
              <span>Phone</span>
              <input
                type="phone"
                name="phone"
                required
                minLength="2"
                maxLength="50"
              />
            </label>

            <label>
              {" "}
              <span>Email</span>
              <input
                type="email"
                name="email"
                required
                minLength="2"
                maxLength="50"
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                required
                minLength="2"
                maxLength="50"
              />
            </label>

            <label>
              <span>Repeat Password</span>
              <input
                type="password"
                name="repeatPassword"
                required
                minLength="2"
                maxLength="50"
              />
            </label>

            <label>
              <span>Company Summary</span>
              <textarea
                name="description"
                required
                minLength={5}
                maxLength={500}
              />
            </label>

            <label>
              <span></span>
              <input type="submit" value="Sign Up" />
            </label>
          </form>
        </div>
      </section>
    </>
  );
}
