import { MyContext } from "../../../Context/Context";
import { ImHeart } from "react-icons/im";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { Link } from "react-scroll";
import "../../../styles/freelancerView.scss";
import React, { useContext, useState } from "react";

export default function FreelancerView() {
  /*   1- in this components we need to add email js 
       in order to send message from company to freelancer 
       2- we need to add functionality to favorite icon 
       */
  const { freelancerFind } = useContext(MyContext);
  const [showContactForm, setShowContactForm] = useState(false);
  let { first_name, last_name, hourly_rate, email, avatar } = freelancerFind;
  console.log(showContactForm);
  return (
    <div className="freelancerView">
      <div className="freelancerViewContainer d-flex justify-content-center align-items-center ">
        <div className="card">
          <div className="upper">
            <img
              src="https://i.imgur.com/Qtrsrk5.jpg"
              alt=""
              className="img-fluid"
            />
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

            <ImHeart className="iconHeart text-danger" size="35px" />

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
                <HiOutlineMail
                  onClick={() => setShowContactForm(false)}
                  size="35px"
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <HiOutlineMailOpen
                  onClick={() => setShowContactForm(true)}
                  size="35px"
                  style={{ cursor: "pointer" }}
                />
              )}
            </Link>
          </div>
          <form
            id="submit"
            className={
              !showContactForm
                ? "d-none "
                : "d-block  animate__animated animate__fadeInDownBig"
            }
          >
            <h1 className="text-danger">Contact Me</h1>
            <input
              name="name"
              type="text"
              className="feedback-input"
              placeholder="Name"
            />
            <input
              name="email"
              type="text"
              className="feedback-input"
              placeholder="Email"
            />
            <textarea
              name="text"
              className="feedback-input"
              placeholder="Comment"
            ></textarea>
            <input type="submit" value="SUBMIT" className="bg-danger" />
          </form>
        </div>
      </div>
    </div>
  );
}
