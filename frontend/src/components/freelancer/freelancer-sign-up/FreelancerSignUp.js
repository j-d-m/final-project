// import {
//   MdCall,
//   MdEmail,
//   MdPersonPin,
//   MdContactPhone,
//   MdPassword,
//   MdOutlineMoney
// } from "react-icons/md";
import { useMutation } from "@apollo/client";
import React from "react";
import { CREATE_USER_MUTATION } from "../../../graphQL/Mutations";

export default function UserSignUp() {
  let first_name,
    last_name,
    phone,
    email,
    password,
    repeatPassword,
    hourly_rate,
    description;
  console.log(hourly_rate);

  const [addUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

  //query to push the from information to the database
  const formSubmitAddUser = (e) => {
    e.preventDefault();
    addUser({
      variables: {
        first_name: first_name.value,
        last_name: last_name.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
        description: description.value,
        hourly_rate: Number(hourly_rate.value),
      },
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
          <input
            type="text"
            placeholder="First Name"
            ref={(value) => (first_name = value)}
          />
          <label> {/* <MdRestaurant /> */} Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            ref={(value) => (last_name = value)}
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
          <label> {/* <MdCall />  */}Phone</label>
          <input
            type="Phone"
            placeholder="phone number"
            ref={(value) => (phone = value)}
          />
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
          <label>
            {" "}
            {/*     <MdOutlineMoney /> */}
            Hourly Rate
          </label>
          <input
            type="number"
            placeholder="Your Hourly Rate"
            ref={(value) => (hourly_rate = value)}
          />
          <label>Describe your Roll</label> <br />
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="What do you do?"
            ref={(value) => (description = value)}
          />
          <input type="submit" value="signup" />
        </form>
      </div>
    </>
  );
}
