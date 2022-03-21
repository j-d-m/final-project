//Native Imports
import React, { useContext, useState } from "react";

//External Imports
import { GET_USERS } from "../../graphQL/Queries";
import { Modal, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";

//Internal Imports
import "../../styles/freelancerProfileStyle.scss";
import "../../styles/freelanceHome.scss";
import staffBook from "../../assets/img/staffBook.svg";
import { MyContext } from "../../Context/Context";
import FreelancerView from "../freelancer/freelancer-profile/FreelancerView";

export default function FreelancerHome(props) {
  const [searchFreelancers, setSearchFreelancers] = useState("");
  const [currentFreelancer, setCurrentFreelancer] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);

  const { setFreelancerFind } = useContext(MyContext);
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) {
    return <p></p>; //empty because we dont want to show anything
  }
  if (error) {
    console.log(error);
    return <p>error:</p>;
  }

  // const contactFreelancer = (id) => {
  //   let findUser = data.getUsers.find((freelancer) => freelancer.id === id);
  //   setFreelancerFind(findUser);
  // };

  const result =
    data &&
    data.getUsers.filter((user) => {
      return user.description.includes(searchFreelancers);
    });


  return (
    <>
      <Modal
        {...props}
        size="xl"
        centered
        className="ProfileUpdate jobsAdminModalBg "
      >
        <Modal.Header closeButton>
          <Modal.Title className="contained-modal-title-vcenter w-100">
            <div className="update-jobs-title d-flex align-items-center justify-content-around">
              <h3>Staff Search</h3>
              <img alt="" src={staffBook} width="80" height="80" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/*search begins*/}
          <div className="FreelancerSearch">
            {/* <h3 className="Title">Search for a Freelancer</h3> */}
            <form className="Search-Form">
              <input
                onChange={(e) => setSearchFreelancers(e.target.value)}
                type="text"
                name="freelancerSearch"
                placeholder="Search by Position"
              />
            </form>
          </div>
          {/*search ends*/}

          {result.length > 0 ? (
            result.map((user) => {
              console.log(user.id);

              return (
                <section className="MainContainer" key={user.id}>
                  <div className="bodyCard-avatar">
                    <img src={user.avatar} alt="img" />
                    <h2 className="name">
                      {`${user.first_name[0].toUpperCase() + user.first_name.substring(1).toLowerCase()} 
                      ${user.last_name[0].toUpperCase() + user.last_name.substring(1).toLowerCase()}`}

                    </h2>
                    {/*button to open the freelancer contact card*/}
                    <div className="OpenContact">
                      <Button
                        className="Btn contactDetailsButton" 
                        variant="secondary"
                        onClick={() => {
                          // contactFreelancer(user.id);
                          setCurrentFreelancer(user.id);
                          setShowContactForm(!showContactForm);
                        }}
                      >
                        {showContactForm &&
                          currentFreelancer === user.id ?
                          "Details" : "Contact"
                        }

                      </Button>
                    </div>
                  </div>


                  {showContactForm &&
                    currentFreelancer === user.id ? (

                    <FreelancerView />
                  ) : (
                    <>


                      {/* button to open the freelancer contact card END*/}
                      < div className="bodyCard-details">
                        <p>
                          <span>Name: </span>
                          {user.first_name[0].toUpperCase() + user.first_name.substring(1).toLowerCase()
                            + " " +
                            user.last_name[0].toUpperCase() + user.last_name.substring(1).toLowerCase()}
                        </p>
                        <p>
                          <span>Hourly Rate: </span>
                          {`€${user.hourly_rate} per hour `}
                        </p>

                        <p>
                          <span>Summary/Position: </span>
                          {user.description[0].toUpperCase() + user.description.substring(1).toLowerCase()}
                        </p>
                        <p>
                          <span>Phone Number: </span>
                          {user.phone}
                        </p>
                        <p>
                          <span>Email: </span>
                          {user.email.toLowerCase()}
                        </p>
                      </div>
                    </>)
                  }
                </section>
              );
            })
          ) : (
            <h3 className="text-center my-5">
              No such Freelancer is Available
            </h3>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
