import { MyContext } from "../../../Context/Context";
import { ImHeart } from "react-icons/im";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { Link } from "react-scroll";
import "../../../styles/freelancerView.scss";
import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

export default function FreelancerView(props) {
  /*  2- we need to add functionality to favorite icon
   */
  const { freelancerFind, companyLoginData, isCompanyLogin } =
    useContext(MyContext);
  const [showContactForm, setShowContactForm] = useState(false);
  let { first_name, last_name, hourly_rate, email, phone, avatar } =
    freelancerFind;

  const FormHandler = (e) => {
    e.preventDefault();
    if (isCompanyLogin) {
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID_TWO,
          e.target,
          process.env.REACT_APP_EMAILJS_USER_ID
        )
        .then((result) => {
          console.log(result.status);
          if (result.status === 200) {
            Swal.fire({
              position: "top",
              icon: "success",

              title: "Your Email was Sent",
              showConfirmButton: false,
              timer: 2000,
            });
            props.onHide();
          } else {
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Your email was not Sent",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });

      e.target.reset();
    }
  };

  return (
    <Modal
      {...props}
      size="fullscreen"
      centered
      className="ProfileUpdate modal"
    >

      <Modal.Header closeButton>
        <Modal.Title className="contained-modal-title-vcenter w-100">
          <div className="update-jobs-title d-flex align-items-center justify-content-around">
            <h3>Contact Freelancer</h3>
            {/* <img alt="" src={hotPan} width="80" height="80" /> */}
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalBody">


        <div className="freelancerView">
          <div className="freelancerViewContainer d-flex justify-content-center align-items-center ">
            <div className="Card">
              <div className="upper">
                {/* <img
                  src="https://i.imgur.com/Qtrsrk5.jpg"
                  alt=""
                  className="img-fluid"
                /> */}
              </div>
              <div className="user text-center">
                <div className="profile">
                  <img
                    src={avatar}
                    alt="img"
                    className="rounded-circle"
                    width="80"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <h4 className="mb-0">{`${first_name} ${last_name}`}</h4>
                <span className="text-muted d-block mb-2">{email}</span>

                <p> Phone: {phone}</p>
                {/* <div className="Favourite">
                  <h5>Add this person to your favorites</h5>{" "}
                  <ImHeart className="iconHeart text-danger" size="35px" />
                </div> */}

                <div className="stats mt-2">
                  <h6 className="mb-0">Hourly_rate</h6>
                  <span>{hourly_rate}</span>
                </div>
              </div>
              <div className="contactMainBtn text-center">
                <Link
                  to="submit"
                  spy={true}
                  smooth={true}
                  offset={320}
                  duration={200}
                  delay={500}
                >
                  {showContactForm ? (
                    <HiOutlineMailOpen
                      onClick={() => setShowContactForm(false)}
                      size="35px"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <HiOutlineMail
                      onClick={() => setShowContactForm(true)}
                      size="35px"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Link>
              </div>
              <form
                onSubmit={FormHandler}
                id="submit"
                className={
                  !showContactForm
                    ? "d-none "
                    : "d-block  animate__animated animate__fadeInDownBig"
                }
              >
                <h1 className="text-white bg-dark text-center">Direct Contact</h1>
                <input
                  type="text"
                  name="to_name"
                  className="form-control d-none"
                  defaultValue={`${first_name} ${last_name}`}
                  readOnly
                />
                <input
                  type="email"
                  name="to_email"
                  className="form-control d-none"
                  value={email}
                  readOnly
                />
                <input
                  name="from_name"
                  type="text"
                  className="feedback-input text-dark"
                  value={companyLoginData.owner_name}
                  readOnly
                />
                <input
                  name="from_email"
                  type="text"
                  className="feedback-input text-dark"
                  value={companyLoginData.email}
                  readOnly
                />
                <textarea
                  className="feedback-input text-dark"
                  placeholder="Comment"
                  name="from_message"
                  required
                  minLength={10}
                  maxLength={200}
                ></textarea>
                <input
                  type="submit"
                  value="Send"
                  className="text-white bg-dark"
                />
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
