import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import { GET_ONE_USER } from "../../../graphQL/Queries";
import "../../../styles/freelancerProfileStyle.scss";
import DeleteFreelancerAccount from "./DeleteFreelancerAccount";
import FreelancerUpdateProfile from "./FreelancerUpdateProfile";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineUnorderedList } from 'react-icons/ai';

export default function FreelancerProfile() {
  const navigate = useNavigate();
  const { freelancerLoginData, setFreelancerLoginData } = useContext(MyContext);
  const [modalShow, setModalShow] = useState();
  const [modalShow1, setModalShow1] = useState();
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
  if (data) {
    setFreelancerLoginData(data.getOneUser);
  }
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
            } = data.getOneUser;
            return (
              <>
                <div className="Freelance-Avatar">
                  <img src={avatar} alt="img" width="200px" height="200px" />
                  <label htmlFor="file-upload" className="Custom-File-Upload">
                    <input id="file-upload" type="file" /> Change Image
                  </label>
                </div>

                <div className="Freelance-Right">

                  <div className="textProfile">
                    <h1>Your Staff Room Profile</h1>
                    <p>here you can edit your profile, delete account or go to the job search page</p>
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
                  <section>
                    <div className="ModalBtnFreelancerProfile">
                      <Button
                        type="button"
                        className="btn btn-secondary btn-circle btn-xl"
                        id={id}
                        onClick={() => {
                          setModalShow(true);
                        }}
                      ><AiOutlineEdit />
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
                      > <AiOutlineDelete />
                        
                      </Button>

                      <DeleteFreelancerAccount
                        show={modalShow1}
                        onHide={() => setModalShow1(false)}
                      />
                      <Button
                        onClick={() => navigate("/home")}
                        className="btn btn-secondary btn-circle btn-xl"
                      > <AiOutlineUnorderedList/>
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
