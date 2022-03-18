import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { GET_USERS } from "../../graphQL/Queries";
import "../../styles/freelancerProfileStyle.scss";
import { MyContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import "../../styles/freelanceHome.scss";
import { Button } from "react-bootstrap";
import FreelancerView from "../freelancer/freelancer-profile/FreelancerView";
export default function FreelancerHome() {
  const [searchFreelancers, setSearchFreelancers] = useState("");
  const { freelancerFind, setFreelancerFind } = useContext(MyContext);
  const { loading, error, data } = useQuery(GET_USERS);
  const [modalShowFreelancer, setModalShowFreelancer] = useState();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);
    return <p>error:</p>;
  }

  const contactFreelancer = (id) => {
    let findUser = data.getUsers.find((freelancer) => freelancer.id === id);
    setFreelancerFind(findUser);
  };

  const result =
    data &&
    data.getUsers.filter((user) => {
      return user.description.includes(searchFreelancers);
    });
  return (
    <div className="Wrapper">
      {/*search begins*/}
      <div className="FreelancerSearch">
        <h3 className="Title">Search for a Freelancer</h3>
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
                {/*button to open the freelancer contact card*/}
                <div className="OpenContact">
                  <Button
                    className="btn btn-secondary btn-circle btn-xl"
                    onClick={() => {
                      setModalShowFreelancer(true);
                      contactFreelancer(user.id);
                    }}
                  >
                    contact this freelancer
                  </Button>

                  <FreelancerView
                    show={modalShowFreelancer}
                    onHide={() => setModalShowFreelancer(false)}
                  />
                </div>
              </div>
              {/* button to open the freelancer contact card END*/}
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
        <h3>No such Freelancer is Available</h3>
      )}
    </div>
  );
}
