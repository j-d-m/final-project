// import {
//   MdCall,
//   MdEmail,
//   MdPersonPin,
//   MdContactPhone,
//   MdPassword,
//   MdOutlineMoney
// } from "react-icons/md";
import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MyContext } from "../../../Context/Context";
import { CREATE_USER_MUTATION } from "../../../graphQL/Mutations";

export default function UserSignUp() {
  const { setFreelancerLoginData } = useContext(MyContext);
  let navigate = useNavigate();

  const [addUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

  //query to push the from information to the database
  const formSubmitAddUser = (e) => {
    e.preventDefault();
    addUser({
      variables: {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        password: e.target.password.value,
        repeatPassword: e.target.repeatPassword.value,
        description: e.target.description.value,
        hourly_rate: Number(e.target.hourly_rate.value),
      },
    }).then((res) => {
      if (res.data) {
        setFreelancerLoginData(res.data);
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

  if (error) return <p>Error :(</p>;
  console.log(data);
  console.log(error);
  return (
    <>
      <div className="Freelancer-sign-container">
        <h1>Freelancer Signup Page</h1>
        <h2>Lets find you some work</h2>
      </div>
      <div className="form-container">
        <form onSubmit={formSubmitAddUser}>
          <label> {/* <MdPersonPin /> */} First Name</label>
          <input type="text" placeholder="First Name" name="first_name" />
          <label> {/* <MdRestaurant /> */} Last Name</label>
          <input type="text" placeholder="Last Name" name="last_name" />
          <label>
            {" "}
            {/*     <MdEmail /> */}
            Email
          </label>
          <input type="email" placeholder="email" name="email" />
          <label> {/* <MdCall />  */}Phone</label>
          <input type="Phone" placeholder="phone number" name="phone" />
          <label> {/* <MdPassword /> */} Password</label>
          <input type="password" placeholder="password" name="password" />
          <label> {/*   <MdPassword /> */} Repeat Password</label>
          <input
            type="password"
            placeholder="repeat password"
            name="repeatPassword"
          />
          <label>
            {" "}
            {/*     <MdOutlineMoney /> */}
            Hourly Rate
          </label>
          <input
            type="number"
            placeholder="Your Hourly Rate"
            name="hourly_rate"
          />
          <label>Describe your what you do/offer</label> <br />
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="What do you do?"
          />
          <input type="submit" value="signup" />
        </form>
      </div>
    </>
  );
}
