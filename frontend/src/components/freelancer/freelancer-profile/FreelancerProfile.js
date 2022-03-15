import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import { GET_ONE_USER } from "../../../graphQL/Queries";
import "../../../styles/freelancerProfileStyle.scss";
import DeleteFreelancerAccount from "./DeleteFreelancerAccount";
import FreelancerUpdateProfile from "./FreelancerUpdateProfile";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { UPDATE_USER } from "../../../graphQL/Mutations";
import Swal from "sweetalert2";

export default function FreelancerProfile() {
  const navigate = useNavigate();
  const { freelancerLoginData, setFreelancerLoginData, jobAccepted } =
    useContext(MyContext);
  //logging result of the job contact form to pass it to the profile on successful contact of the company

  const [modalShow, setModalShow] = useState();
  const [modalShow1, setModalShow1] = useState();
  const [UpdateUser, { data1, loading1, error1 }] = useMutation(UPDATE_USER);
  const updateAvatar = (e) => {
    e.preventDefault();
    UpdateUser({
      variables: {
        updateUserId: freelancerLoginData.id,
        file: e.target.files[0],
      },
    }).then((res) => {
      if (res.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "profile updated successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (error) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "something went wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const { loading, error, data } = useQuery(GET_ONE_USER, {
    variables: { getOneUserId: freelancerLoginData.id },
  });

  if (loading)
    return (
      <img
        src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
        alt="img"
      />
    );

  setTimeout(() => {
    if (data) {
      setFreelancerLoginData(data.getOneUser);
    }
  }, 100);

  return (
    <section className="Profile-Container">
      <div className="Banner-Container">
        {data &&
          (() => {
            let {
              id,
              first_name,
              last_name,
              email,
              phone,
              hourly_rate,
              description,
              avatar,
              favorite,
            } = data.getOneUser;

            return (
              <>
                <div className="Freelance-Avatar">
                  <img src={avatar} alt="img" width="200px" height="200px" />
                  <label htmlFor="file-upload" className="Custom-File-Upload">
                    <input
                      id="file-upload"
                      type="file"
                      onChange={updateAvatar}
                    />
                    Change Image
                  </label>
                </div>

                <div className="Freelance-Right">
                  <div className="textProfile">
                    <h1>Your Staff Room Profile</h1>
                    <p>
                      here you can edit your profile, delete account or go to
                      the job search page
                    </p>
                  </div>

                  <div>
                    <p>First name : {first_name}</p>
                  </div>
                  <div>
                    <p>Last name : {last_name}</p>
                  </div>

                  <div>
                    <p>Email : {email}</p>
                  </div>
                  <div>
                    <p>Phone : {phone}</p>
                  </div>
                  <div>
                    <p>Your hourly : {hourly_rate}</p>
                  </div>
                  <div>
                    <p>Your position : {description}</p>
                  </div>
                  <div className="JobHistory">
                    {favorite.length === 0 ? (
                      <p>you have not applied for any jobs</p>
                    ) : (
                      <section>
                        {favorite.map((job) => {
                          return (
                            <div>
                              <h5>{job.job_Title}</h5>
                              <p>{job.start_Date}</p>
                            </div>
                          );
                        })}
                      </section>
                    )}
                  </div>
                  <section>
                    <div className="ModalBtnFreelancerProfile">
                      <Button
                        type="button"
                        className="btn btn-secondary btn-circle btn-xl"
                        id={id}
                        onClick={() => {
                          setModalShow(true);
                        }}
                      >
                        <AiOutlineEdit />
                        <span>Edit</span>
                      </Button>
                      <FreelancerUpdateProfile
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />

                      <Button
                        id={id}
                        className="btn btn-secondary btn-circle btn-xl"
                        onClick={() => {
                          setModalShow1(true);
                        }}
                      >
                        {" "}
                        <AiOutlineDelete />
                        <span>Delete</span>
                      </Button>

                      <DeleteFreelancerAccount
                        show={modalShow1}
                        onHide={() => setModalShow1(false)}
                      />
                      <Button
                        onClick={() => navigate("/home")}
                        className="btn btn-secondary btn-circle btn-xl"
                      >
                        {" "}
                        <AiOutlineUnorderedList />
                        <span>Jobs</span>
                      </Button>
                    </div>
                  </section>
                </div>
              </>
            );
          })()}
      </div>
    </section>
  );
}
