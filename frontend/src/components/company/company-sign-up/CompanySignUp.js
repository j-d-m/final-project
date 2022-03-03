import { useMutation } from "@apollo/client";
import React from "react";
import Swal from "sweetalert2";
import "../../../styles/companySignUp.scss";
import logo from "../../../assets/img/logo.svg";
import { MyContext } from "../../../Context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CREATE_COMPANY_MUTATION } from "../../../graphQL/Mutations";

export default function CompanySignUp() {
  const { setCompanyLoginData } = useContext(MyContext);
  let navigate = useNavigate();

  const [addCompany, { data, loading, error }] = useMutation(
    CREATE_COMPANY_MUTATION
  );

  //query to push the from information to the database
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
          title: "account created successfully",
          showConfirmButton: false,
          timer: 2000,
          customClass: "swal-width",
        });
      }
    });
  };

  if (loading)
    return (
      <img
        src="https://c.tenor.com/gJLmlIn6EvEAAAAM/loading-gif.gif"
        alt="spinner"
      />
    );
  if (error) return `${error.message}`;

  console.log(data);
  console.log(error);

  return (
    <>
      <section className="Company-sign-container">
        <div className="Wall-left bg-secondary">
          <div>
            <img src={logo} alt="signup logo" />
          </div>
        </div>

        <div className="container signUp-form-right">
          <h2>Company Signup page</h2>

          <form className="form-style-5" onSubmit={formSubmitAddCompany}>
            <legend>
              Let's get you all set up to find the perfect freelancer !
            </legend>

            <label>
              <span>Company Name</span>
              <input type="text" name="company_Name" />
            </label>

            <label>
              <span>Owner/Manager Name</span>
              <input type="text" name="owner_name" />
            </label>
            <label>
              <span>Type of Company</span>
              <input type="text" name="company_type" />
            </label>

            <label>
              <span>Company Address</span>
              <input type="text" name="address" />
            </label>

            <label>
              <span>Phone</span>
              <input type="phone" name="phone" />
            </label>

            <label>
              {" "}
              <span>Email</span>
              <input type="email" name="email" />
            </label>
            {/* <label>
                  {" "}
                  <MdContactPhone /> Contact Person
                </label>
                <input type="text" placeholder="contact person" onChange={(e)=>{set}} /> */}

            <label>
              <span>Password</span>
              <input type="password" name="password" />
            </label>

            <label>
              <span>Repeat Password</span>
              <input type="password" name="repeatPassword" />
            </label>

            <label>
              <span>Describe your company</span>
              <textarea name="description" maxLength={800} />
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
