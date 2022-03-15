import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { GET_USERS } from "../../graphQL/Queries";
import "../../styles/freelancerProfileStyle.scss";
import { MyContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import "../../styles/freelanceHome.scss";

export default function FreelancerHome() {
  const navigate = useNavigate();
  const { setFreelancerFind } = useContext(MyContext);
  const { loading, error, data } = useQuery(GET_USERS);
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
    navigate("/freelancer-view");
  };

  return (
    <div className="freelancer container-fluid ">
      {data &&
        data.getUsers.map((user) => {
          return (
            <section
              className="CardUser animate__animated animate__backInLeft 
              MainContainer"
              key={user.id}
            >
              <div className="bodyCard">
                <img src={user.avatar} alt="img" width="150px" height="150px" />
                <h2 className="name">{`${user.first_name} ${user.last_name}`}</h2>
                <p> freelancer's Email: {user.email}</p>
              </div>
              <div className="description Skills">
                <h5>They are a looking for / have experience with:</h5>{" "}
                <p>{user.description}</p>
              </div>
              <div className="OpenContact">
                <input
                  type="button"
                  value="contact"
                  className="Btn"
                  onClick={() => contactFreelancer(user.id)}
                />
              </div>
            </section>
          );
        })}
    </div>
  );
}
