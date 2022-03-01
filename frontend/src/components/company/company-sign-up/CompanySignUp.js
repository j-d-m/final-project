// import {
//   MdCall,
//   MdEmail,
//   MdLocationPin,
//   MdRestaurant,
//   MdPersonPin,
//   MdBusiness,
//   // MdContactPhone,
//   MdPassword,
// } from "react-icons/md";
import { useMutation } from "@apollo/client";
import React from "react";
import Swal from "sweetalert2";
import { CREATE_COMPANY_MUTATION } from "../../../graphQL/Mutations";

export default function CompanySignUp() {
  let company_Name,
    owner_name,
    company_type,
    address,
    phone,
    email,
    password,
    repeatPassword,
    description;

  const [addCompany, { data, loading, error }] = useMutation(
    CREATE_COMPANY_MUTATION
  );

  //query to push the from information to the database
  const formSubmitAddCompany = (e) => {
    e.preventDefault();
    addCompany({
      variables: {
        company_Name: company_Name.value,
        owner_name: owner_name.value,
        company_type: company_type.value,
        address: address.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
        description: description.value,
      },
    }).then((res) => {
      console.log(res);
      if (res.data) {
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
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/552dd336197347.57136163e85ec.gif"
        alt="img"
      />
    );
  console.log(data);
  console.log(error);

  return (
    <>
      <div className="company-sign-container">
        <h1>Company Signup page</h1>
        <h2>
          Lets get you all set up to for your hunt to find the perfect
          freelancer.
        </h2>
      </div>
      <div className="form-container">
        <form onSubmit={formSubmitAddCompany}>
          <label> {/* <MdBusiness /> */} Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            ref={(value) => (company_Name = value)}
          />
          <label> {/* <MdPersonPin /> */} Owner/Manager Name</label>
          <input
            type="text"
            placeholder="Owner/Manager"
            ref={(value) => (owner_name = value)}
          />
          <label> {/* <MdRestaurant /> */} Type of Company</label>
          <input
            type="text"
            placeholder="company type"
            ref={(value) => (company_type = value)}
          />
          <label>{/* <MdLocationPin /> */} Company Address</label>
          <input
            type="text"
            placeholder="Address"
            ref={(value) => (address = value)}
          />
          <label> {/* <MdCall />  */}phone</label>
          <input
            type="phone"
            placeholder="phone number"
            ref={(value) => (phone = value)}
          />
          <label>
            {" "}
            {/*     <MdEmail /> */}
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            ref={(value) => (email = value)}
          />
          {/* <label>
            {" "}
            <MdContactPhone /> Contact Person
          </label>
          <input type="text" placeholder="contact person" onChange={(e)=>{set}} /> */}
          <label> {/* <MdPassword /> */} Password</label>
          <input
            type="password"
            placeholder="password"
            ref={(value) => (password = value)}
          />
          <label> {/*   <MdPassword /> */} Repeat Password</label>
          <input
            type="password"
            placeholder="repeat password"
            ref={(value) => (repeatPassword = value)}
          />
          <label>Describe your company</label> <br />
          <textarea
            name="company description"
            cols="30"
            rows="10"
            placeholder="company description"
            ref={(value) => (description = value)}
          />
          <input type="submit" value="signup" />
        </form>
      </div>
    </>
  );
}
