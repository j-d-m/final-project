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
import '../../../styles/freelanceSignUp.scss';
import logo from '../../../assets/img/logo.svg';





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
    <section className="Freelancer-sign-container ">
          <div className="Wall-left bg-secondary">
            <div>
              <img src={logo} alt="signup logo" />
            </div>
          </div>

          <div className="container signUp-form-right">
            <h2>Freelancer Signup Page</h2>
            
            
            
                <form className="form-style-4" onSubmit={formSubmitAddUser}>
                  
                <legend>Let's find you some work</legend>

                  <label> {/* <MdPersonPin /> */} <span>First Name</span> 
                  <input
                    type="text"
                    name="first_name" 
                    
                    
                  />
                  </label>


                  <label> {/* <MdRestaurant /> */} <span>Last Name</span>
                  
                  <input
                    type="text"
                    name="last_name"
                    
                                        
                  />
                  </label>

                  <label>
                    {" "}
                    {/*     <MdEmail /> */}
                   <span>Email</span> 
                  
                  <input
                    type="email"
                              name="email" 
                    
                                  />
                  </label>

                  <label> {/* <MdCall />  */} <span>Phone</span> 
                  <input
                    type="Phone"
                                     name="phone"
                    
                                  />
                  </label>

                  <label> {/* <MdPassword /> */} <span>Password</span> 
                  <input
                    type="password"
                                 name="password"
                    
                                     />
                  </label>

                  <label> {/*   <MdPassword /> */} <span>Repeat Password</span> 
                  <input
                    type="password"
                      name="repeatPassword"
                    
                  
                  />
                  </label>

                  <label>
                    {" "}
                    {/*     <MdOutlineMoney /> */}
                    <span>Hourly Rate</span> 
                  
                  <input
                    type="number"
                    
                    name="hourly_rate"
                    
                    
                  />
                  </label>

                  <label > <span>Describe your Roll</span> <br />
                  <textarea
                    name="description"
                    maxLength={500}
                                        
                  
                  />
                  </label> 
                  <label>
                    <span> </span>
                    <input  type="submit" value="Sign Up" />
                    
                  </label>
                  
            </form>
        </div>
      </section>
 
     
    </>
  );
}
