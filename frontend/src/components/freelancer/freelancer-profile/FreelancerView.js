import { MyContext } from "../../../Context/Context";
import { ImHeart } from "react-icons/im";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { Link } from "react-scroll";
import "../../../styles/freelancerView.scss";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  COMPANY_FAVORITE,
  DELETE_COMPANY_FAVORITE,
} from "../../../graphQL/Mutations";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";
import { useMutation } from "@apollo/client";

export default function FreelancerView(props) {
  const { freelancerFind, companyLoginData, isCompanyLogin } =
    useContext(MyContext);
  const [showContactForm, setShowContactForm] = useState(false);
  const [companyFavorite, setCompanyFavorite] = useState(false);

  let storeId = companyLoginData.favorite.filter(
    (item) => item.id === freelancerFind.id
  );

  useEffect(() => {
    if (storeId.length > 0) {
      setCompanyFavorite(true);
    } else {
      setCompanyFavorite(false);
    }
  }, [storeId]);

  // we need to filter the freelancerFind state to make companyFavorite true
  let { first_name, last_name, hourly_rate, email, phone, avatar, id } =
    freelancerFind;
  const [updateCompanyFavorite, { data1, loading1, error1 }] = useMutation(
    COMPANY_FAVORITE,
    {
      refetchQueries: [
        {
          query: GET_ONE_COMPANY,
          variables: { getOneCompanyId: companyLoginData.id },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const favoriteBtn = () => {
    updateCompanyFavorite({
      variables: {
        userId: id,
        companyId: companyLoginData.id,
      },
    }).then((res) => {
      if (res.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `you add ${first_name}as a favorite`,
          showConfirmButton: false,
          timer: 1000,
        });
        setCompanyFavorite(true);
      }
      if (error1) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const [deleteCompanyFavorite, { data2, loading2, error2 }] = useMutation(
    DELETE_COMPANY_FAVORITE,
    {
      refetchQueries: [
        {
          query: GET_ONE_COMPANY,
          variables: { getOneCompanyId: companyLoginData.id },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const deleteFavoriteBtn = () => {
    deleteCompanyFavorite({
      variables: {
        userId: id,
        companyId: companyLoginData.id,
      },
    }).then((res) => {
      if (res.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `you delete ${first_name}from your favorite list`,
          showConfirmButton: false,
          timer: 1000,
        });
        setCompanyFavorite(false);
      }
      if (error2) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

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
            <h3>Contact Freelancer </h3>
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

                <div className="FavoriteDiv">
                  <button
                    className="iconBtn"
                    onClick={!companyFavorite ? favoriteBtn : deleteFavoriteBtn}
                  >
                    <ImHeart
                      className={
                        companyFavorite
                          ? "iconHeart Favorite"
                          : "iconHeart notFavorite"
                      }
                      size="35px"
                    />
                  </button>
                </div>

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
                <h1 className="text-white bg-dark text-center">
                  Direct Contact
                </h1>
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
