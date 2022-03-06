import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { GET_USERS } from "../../graphQL/Queries";
import "../../styles/_freelancerHome.scss";
import { MyContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

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
    <div className="freelancer">
      {data &&
        data.getUsers.map((user) => {
          return (
            <section
              className="CardUser animate__animated animate__backInLeft"
              key={user.id}
            >
              <img src={user.avatar} alt="img" width="150px" height="150px" />
              <div className="bodyCard">
                <h2 className="name">{`${user.first_name} ${user.last_name}`}</h2>
                <p> {user.email}</p>
                <input
                  type="button"
                  value="contact"
                  className="Btn"
                  onClick={() => contactFreelancer(user.id)}
                />
              </div>
              <div className="description">
                <p>Description</p>
                <p>{user.description}</p>
              </div>
            </section>
          );
        })}
    </div>
  );
}
