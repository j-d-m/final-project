//Native Imports
import React, { useContext, useState } from "react";

//External Impors
import emailjs from "@emailjs/browser";
import { useMutation } from "@apollo/client";

//Internal Imports
import { USER_FAVORITE } from "../../graphQL/Mutations";
import { MyContext } from "../../Context/Context";
import { GET_ONE_USER } from "../../graphQL/Queries";
import '../../styles/contact.scss'
import waiterSmile from "../../assets/img/waiter-smile.svg";



export default function Contact({ job }) {
  const [emailSent, setEmailSent] = useState(false);
  const { freelancerLoginData, isFreelancerLogin } = useContext(MyContext);

  const [UpdateUserFavorite, { data, loading, error }] = useMutation(
    USER_FAVORITE,
    {
      refetchQueries: {
        query: GET_ONE_USER,
        variables: { getOneUserId: freelancerLoginData.id },
      },
    }
  );

  const sendEmail = (e) => {
    e.preventDefault();
    if (isFreelancerLogin) {
      if (freelancerLoginData.email === e.target.from_email.value) {
        emailjs
          .sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            e.target,
            process.env.REACT_APP_EMAILJS_USER_ID
          )
          .then((result) => {
            if (true) {
              UpdateUserFavorite({
                variables: {
                  userId: freelancerLoginData.id,
                  job: {
                    id: job.id,
                    job_Title: job.job_Title,
                    start_Date: job.start_Date,
                    end_Date: job.end_Date,
                    num_of_people_needed: job.num_of_people_needed,
                    job_description: job.job_description,
                  },
                },
              });
            }
          })
          .catch((err) => console.log(err));
        e.target.reset();
        setEmailSent(true);
      }
    }
  };


  return (
    <>
      {emailSent ? (
        <div className="alert text-center" role="alert">
          Your message was sent!
          <img alt="" src={waiterSmile} width="150" height="150" className="" />
        </div>
      ) : (

        //company data
        <div className="container contact-form-freelancer contactFormContainer ">
          <h4>Contact the Company</h4>
          <form onSubmit={sendEmail}>
            <div className="d-flex justify-content-between mb-3 ">
              <div className="w-100" >
                <div className="form-group col-auto ">
                  <label htmlFor="name">Company Name</label>
                  <input
                    type="text"
                    name="to_name"
                    className="form-control"
                    defaultValue={job.created_by.company_Name}
                    readOnly
                  />
                </div>
                <div className="form-group col-auto">
                  <label htmlFor="email">Company Email</label>
                  <input
                    type="email"
                    name="to_email"
                    className="form-control"
                    defaultValue={job.created_by.email}
                    readOnly
                  />
                </div>
              </div>
              <div
                className="
              d-flex
              justify-content-center
              align-items-center                         
              "              >
                <img
                  src={job.created_by.avatar}
                  className="contact-avatar-company  "
                  alt=""
                />
              </div>
            </div>


            {/* freelancer data */}
            <div className="d-flex justify-content-between">
              <div
                className="
              d-flex
              justify-content-center
              align-items-center                         
              "              >
                <img
                  src={freelancerLoginData.avatar}
                  className="contact-avatar-freelancer  "
                  alt=""
                />
              </div>
              <div className="w-100">
                <div className="form-group col-auto">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    name="from_name"
                    className="form-control"
                    defaultValue={`${freelancerLoginData.first_name} ${freelancerLoginData.last_name}`}
                    maxLength="50"
                    required
                  />
                </div>
                <div className="form-group col-auto">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="from_email"
                    className="form-control"
                    defaultValue={freelancerLoginData.email}
                    maxLength="50"
                  />

                </div>

                <div className="form-row">
                  <div className="form-group col-auto">
                    <label htmlFor="phone">Contact Number</label>
                    <input
                      type="tel"
                      name="from_phone"
                      className="form-control"
                      defaultValue={freelancerLoginData.phone}
                      maxLength="20"
                    />
                  </div>
                </div>

              </div>
            </div>
            <div className="form-row mb-3">
              <div className="form-group col-md-12 ">
                <label htmlFor="message">Message</label>
                <textarea
                  type="textarea"
                  name="from_message"
                  className="form-control"
                  placeholder="Message"
                  required
                  rows={5}
                  maxLength={500}
                />
              </div>
            </div>
            <div className="text-end m-2">
              <button
                type="submit"
                className="btn btn-outline-secondary col-3 "
                value="Send"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
