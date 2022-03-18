import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MyContext } from "../../../Context/Context";
import { CREATE_USER_MUTATION } from "../../../graphQL/Mutations";
import "../../../styles/freelanceSignUp.scss";
import logo from "../../../assets/img/logo.svg";

export default function UserSignUp() {
  const { setFreelancerLoginData } = useContext(MyContext);
  let navigate = useNavigate();

  const [addUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

  const formSubmitAddUser = (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.repeatPassword.value) {
      return Swal.fire({
        position: "top",
        icon: "error",
        title: "Your passwords do not match",
        showConfirmButton: false,
        timer: 2000,
        // customClass: "swal-width",
      });
    }
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
          title: "Account Created",
          showConfirmButton: false,
          timer: 2000,
          // customClass: "swal-width",
        });
        navigate("/freelancer-profile");
      }
    });
  };

  // Error handling needs to be reviewed: When there is an error it needs to show
  // Sweeet Alert and dont make the user loses everything he has entered so far 

  if (error) return
  <p>{error} </p>
    ;

  return (
    <>
      <section className="Freelancer-sign-container ">
        <div className="Wall-left bg-secondary">
          <div>
            <img src={logo} alt="signup logo" />
          </div>
        </div>

        <div className="signUp-form-right">
          <h2>Are you a freelancer?</h2>
          <h3>Create an Account</h3>

          <form className="form-style-4" onSubmit={formSubmitAddUser}>
            <legend>Let's find you some work</legend>

            <label>
              <span>First Name</span>
              <input
                type="text"
                name="first_name"
                required
                minLength="2"
                maxLength="50"
              />
            </label>
            <label>
              <span>Last Name</span>
              <input
                type="text"
                name="last_name"
                required
                minLength="2"
                maxLength="50"
              />
            </label>
            <label>
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
              <span>Phone</span>
              <input
                type="Phone"
                name="phone"
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
              <span>Hourly Rate</span>
              <input
                type="number"
                name="hourly_rate"
                minLength="1"
                maxLength="10"
              />
            </label>

            <label>
              <span>Describe your Roll</span> <br />
              <textarea
                name="description"
                required
                minLength="5"
                maxLength="500"
              />
            </label>
            <label>
              <span> </span>
              <input
                type="submit"
                value="Sign Up"
              />
            </label>
          </form>
        </div>
      </section>
    </>
  );
}
