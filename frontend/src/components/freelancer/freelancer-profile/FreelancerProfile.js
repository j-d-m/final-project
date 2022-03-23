import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
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
  AiOutlineHistory,
} from "react-icons/ai";
import { UPDATE_USER } from "../../../graphQL/Mutations";
import Swal from "sweetalert2";
import jobApplication from "../../../assets/img/jobApplication.svg";

export default function FreelancerProfile() {
  const navigate = useNavigate();
  const { freelancerLoginData, setFreelancerLoginData } = useContext(MyContext);

  const [modalShow, setModalShow] = useState();
  const [modalShow1, setModalShow1] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  if (loading) {
    return (
      <div className="m2-auto text-center loading-block">
        <img
          src="https://cdn.dribbble.com/users/924068/screenshots/3757746/media/6035d641a7d26f1ba75421d15ce173cf.gif"
          alt="img"
        />
      </div>
    );
  }

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
                <div className="BoxContainer">
                  <div className="Freelance-Avatar">
                    <img
                      src={avatar}
                      alt="img"
                      //  width="200px" height="200px"
                    />
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
                    <h1>
                      {first_name} {last_name}
                    </h1>

                    <div>
                      <p>
                        <span>Email</span>
                        <span>{email}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>Phone</span>
                        <span>{phone}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>Your hourly</span>
                        <span>{hourly_rate}</span>
                      </p>
                    </div>
                    <div>
                      <p className="Desc-comp">
                        <span>Your position</span>
                        <span>{description}</span>
                      </p>
                    </div>

                    <div className="JobHistory">
                      {favorite.length === 0 ? (
                        <section>
                          <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header closeButton>
                              <Modal.Title className="contained-modal-title-vcenter w-100">
                                <div className="d-flex align-items-center justify-content-around job-application-history-empty-title">
                                  <h3>Job Application History</h3>
                                  <img
                                    alt=""
                                    src={jobApplication}
                                    width="80"
                                    height="80"
                                  />
                                </div>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <p>You didn't contact any company yet.</p>
                            </Modal.Body>
                          </Modal>
                        </section>
                      ) : (
                        <section>
                          <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header closeButton>
                              <Modal.Title className="contained-modal-title-vcenter w-100">
                                <div className="d-flex align-items-center justify-content-around job-application-history-title-filled">
                                  <h3>Job Application History</h3>
                                  <img
                                    alt=""
                                    src={jobApplication}
                                    width="80"
                                    height="80"
                                  />
                                </div>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Table
                                striped
                                bordered
                                hover
                                variant="inherit"
                                color="inherit"
                                borderless="true"
                                size="sm"
                              >
                                <thead>
                                  <tr>
                                    <th>Job Title</th>
                                    <th>Applied on</th>
                                  </tr>
                                </thead>
                                {favorite.map((job, index) => (
                                  <tbody key={job.id}>
                                    <tr>
                                      <td>{job.job_Title}</td>
                                      <td>{job.start_Date}</td>
                                    </tr>
                                  </tbody>
                                ))}
                              </Table>
                            </Modal.Body>
                          </Modal>
                        </section>
                      )}
                    </div>
                  </div>
                </div>
                <section className="BtnSection">
                  <div className="ModalBtnFreelancerProfile">
                    <Button
                      id={id}
                      className="btn btn-secondary btn-circle btn-xl"
                      onClick={handleShow}
                    >
                      {" "}
                      <AiOutlineHistory />
                      <span>History</span>
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-secondary btn-circle btn-xl"
                      id={id}
                      onClick={() => {
                        setModalShow(true);
                      }}
                    >
                      <div className="EditBtn">
                        <AiOutlineEdit />
                        <span>Edit</span>
                      </div>
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
              </>
            );
          })()}
      </div>
    </section>
  );
}
