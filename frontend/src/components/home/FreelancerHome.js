//Native Imports
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//External Imports
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphQL/Queries";
import { Modal, Button } from "react-bootstrap";

//Internal Imports
import "../../styles/freelancerProfileStyle.scss";
import "../../styles/freelanceHome.scss";
import staffBook from "../../assets/img/staffBook.svg";
import { MyContext } from "../../Context/Context";
import FreeLancerView from "../freelancer/freelancer-profile/FreelancerView"


export default function FreelancerHome(props) {
  const navigate = useNavigate();

  const [searchFreelancers, setSearchFreelancers] = useState("");
  const [modalShowStaffContact, setModalShowStaffContact] = useState();
  const { setFreelancerFind } = useContext(MyContext);
  const { loading, error, data } = useQuery(GET_USERS);

  // console.log(data);

  if (loading) {
    return <p></p>; //empty because we dont want to show anything
  }
  if (error) {
    console.log(error);
    return <p>error:</p>;
  }

  const contactFreelancer = (id) => {
    let findUser = data.getUsers.find((freelancer) => freelancer.id === id);
    setFreelancerFind(findUser);
    navigate("/freelancer-view");
  };

  const result =
    data &&
    data.getUsers.filter((user) => {
      return user.description.includes(searchFreelancers);
    });


  return (
    <>
      <Modal
        {...props}
        size="lg"
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




        <div className="Wrapper">
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
              return (
                <section className="MainContainer" key={user.id}>
                  <div className="bodyCard">
                    <img src={user.avatar} alt="img" />
                    <h2 className="name">{`${user.first_name} ${user.last_name}`}</h2>

                    <div className="OpenContact">
                      {/* <input
                        type="button"
                        value="contact this freelancer"
                        className="Btn bg-secondary text-light "
                        onClick={() => contactFreelancer(user.id)}
                      /> */}



                      <Button
                        // id={id}
                        className="Btn bg-secondary text-light "
                        onClick={() => {
                          setModalShowStaffContact(true);;
                        }}
                      >
                        contact this freelancer
                      </Button>




                      <FreeLancerView
                        show={modalShowStaffContact}
                        onHide={() => setModalShowStaffContact(false)}
                      />








                    </div>
                  </div>
                  <div className="Description Skills">
                    <h5>
                      {user.first_name} is a looking for / has experience doing:
                    </h5>{" "}
                    <p>{user.description}</p>
                  </div>
                </section>
              );
            })
          ) : (
            <h3
              className="text-center my-5"
            >No such Freelancer is Available</h3>
          )}
        </div>
      </Modal>
    </>
  );
}
