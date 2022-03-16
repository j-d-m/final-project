import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { GET_USERS } from "../../graphQL/Queries";
import "../../styles/freelancerProfileStyle.scss";
import { MyContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import "../../styles/freelanceHome.scss";

export default function FreelancerHome() {
  const navigate = useNavigate();
  const [searchFreelancers, setSearchFreelancers] = useState("");
  const { setFreelancerFind } = useContext(MyContext);
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(data);

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

  const result =
    data &&
    data.getUsers.filter((user) => {
      return user.description.includes(searchFreelancers);
    });
  return (
    <div className="Wrapper">
      {/*search begins*/}
      <div className="FreelancerSearch">
        <form className="Search-Form">
          <input
            onChange={(e) => setSearchFreelancers(e.target.value)}
            type="text"
            name="freelancerSearch"
            placeholder="Search by name or position"
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
        })
      ) : (
        <h3>No such Freelancer is Available</h3>
      )}
    </div>
  );
}
