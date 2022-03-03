import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { GET_USERS } from "../../graphQL/Queries";
import "../../styles/_freelancerHome.scss";
import { FaHardHat } from "react-icons/fa";
import { MyContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

export default function FreelancerHome() {
  const [favIconColor, setFavIconColor] = useState(false);
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
  const addFavorite = (id) => {
    console.log(id);
    let findUser = data.getUsers.find((freelancer) => freelancer.id === id);
    setFreelancerFind(findUser);

    setFavIconColor(!favIconColor);
  };

  console.log(data);
  return (
    <div className="freelancer">
      {data &&
        data.getUsers.map((user) => {
          return (
            <section className="CardUser">
              <div className="bodyCard">
                <h2 className="name">{`${user.first_name} ${user.last_name}`}</h2>
                <img src={user.avatar} alt="img" width="50px" />
                <p> {user.email}</p>
              </div>
              <div className="BtnDiv">
                <input
                  type="button"
                  value="contact"
                  className="Btn"
                  onClick={() => navigate("/freelancer-view")}
                />

                <FaHardHat
                  className={favIconColor ? "text-danger" : "fa-favorite"}
                  onClick={() => addFavorite(user.id)}
                />
              </div>
            </section>
          );
        })}
    </div>
  );
}
