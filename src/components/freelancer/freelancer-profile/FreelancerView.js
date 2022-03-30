//Native imports
import React, { useContext, useEffect, useState } from "react";

//External Imports
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { ImHeart } from "react-icons/im";
import { useMutation } from "@apollo/client";

//Internal Imports
import { MyContext } from "../../../Context/Context";
import "../../../styles/freelancerView.scss";
import { COMPANY_FAVORITE, DELETE_COMPANY_FAVORITE, } from "../../../graphQL/Mutations";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";
import waiterSmile from "../../../assets/img/waiter-smile.svg";



export default function FreelancerView() {
  const { freelancerFind, companyLoginData, isCompanyLogin } = useContext(MyContext);
  const [companyFavorite, setCompanyFavorite] = useState(false);
  const [emailSent, setEmailSent] = useState(false);


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
          title: `${first_name} added in favorites!`,
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
          title: `${first_name} removed from favorites!`,
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

  const sendEmail = (e) => {
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
          // console.log(result.status);
          if (result.status === 200) {
            setEmailSent(true);
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
      setEmailSent(true);
    }
  };

  return (

    <div className="freelancerView">
      <div className="freelancerViewContainer">
        <div className="">

          <div className="mt-5 text-center">

            <div className="FavoriteDiv m-3">
              <button
                className="iconBtn"
                onClick={!companyFavorite ? favoriteBtn : deleteFavoriteBtn}
              >
                <ImHeart
                  className={
                    companyFavorite
                      ? "iconHeart Favorite me-2"
                      : "iconHeart notFavorite me-2"
                  }
                  size="35px"
                />
              </button>
              <strong>Add to Favorites</strong>
            </div>

          </div>

          <div>
            {emailSent ? (
              <div className="alert text-center" role="alert">
                Your message was sent!
                <img alt="" src={waiterSmile} width="150" height="150" className="" />
              </div>
            ) : (
              //freelancer data
              <div className="container contact-form-freelancer contactFormContainer   animate__animated animate__fadeInDownBig  ">
                <form onSubmit={sendEmail}>
                  <div className="d-flex justify-content-between mb-3 d-none ">
                    <div className="w-100" >
                      <div className="form-group col-auto ">
                        <label htmlFor="name">Freelancer Name</label>
                        <input
                          type="text"
                          name="to_name"
                          className="form-control col-auto"
                          defaultValue={first_name + " " + last_name}
                          readOnly
                        />
                      </div>
                      <div className="form-group col-auto">
                        <label htmlFor="email">Freelancer Email</label>
                        <input
                          type="email"
                          name="to_email"
                          className="form-control"
                          defaultValue={email}
                          readOnly
                        />
                      </div>
                    </div>

                  </div>

                  {/* company data */}
                  <div className="d-flex justify-content-between">

                    <div className="w-100">
                      <div className="form-group col-auto">
                        <label htmlFor="name">Your Company Name</label>
                        <input
                          type="text"
                          name="from_company_name"
                          className="form-control"
                          defaultValue={`${companyLoginData.company_Name}`}
                          maxLength="50"
                          required
                          readOnly
                        />
                      </div>
                      <div className="form-group col-auto">
                        <label htmlFor="name">Your Name</label>
                        <input
                          type="text"
                          name="from_name"
                          className="form-control"
                          defaultValue={`${companyLoginData.owner_name}`}
                          maxLength="50"
                          required
                        />
                      </div>
                      <div className="form-group col-auto">
                        <label htmlFor="email">Your Email Address</label>
                        <input
                          type="email"
                          name="from_email"
                          className="form-control"
                          defaultValue={companyLoginData.email}
                          maxLength="50"
                        />

                      </div>

                      <div className="form-row">
                        <div className="form-group col-auto">
                          <label htmlFor="phone">Your Contact Number</label>
                          <input
                            type="tel"
                            name="from_phone"
                            className="form-control"
                            defaultValue={companyLoginData.phone}
                            maxLength="20"
                          />
                        </div>
                      </div>

                    </div>

                  </div>
                  <div className="form-row mb-3">
                    <div className="form-group col-auto ">
                      <label htmlFor="message">Your Message</label>
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
          </div>
        </div>
      </div>
    </div>

  );
}



