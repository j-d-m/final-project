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
    <div className="F">
      {data &&
        data.getUsers.map((user) => {
          return (
            <section className="MainContainer" key={user.id}>
              <div className="bodyCard">
                <img src={user.avatar} alt="img" />
                <h2 className="name">{`${user.first_name} ${user.last_name}`}</h2>
                <p> Freelancer's Email: {user.email}</p>
                <p> Freelancer's Phone: {user.phone}</p>
                <div className="OpenContact">
                  <input
                    type="button"
                    value="contact this freelancer"
                    className="Btn"
                    onClick={() => contactFreelancer(user.id)}
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
        })}
    </div>
  );
}
