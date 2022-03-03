import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import { GET_ONE_USER } from "../../../graphQL/Queries";

export default function FreelancerProfile() {
  const { freelancerLoginData } = useContext(MyContext);
  console.log(freelancerLoginData);

  // const { loading, error, data } = useQuery(GET_ONE_USER, {
  //   variables: { getOneUserId: freelancerLoginData.userId },
  //   // pollInterval: 500,
  // });
  if (!freelancerLoginData)
    return (
      <img
        src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
        alt="img"
      />
    );

  return (
    <div className="company-profile">
      {freelancerLoginData &&
        (() => {
          let {
            first_name,
            last_name,
            email,
            phone,
            hourly_rate,
            description,
            avatar,
          } = freelancerLoginData;
          return (
            <>
              <div className="company-avatar">
                <img src={avatar} alt="img" width="200px" height="200px" />
                <div>
                  <input type="file" />
                  <p>Upload your picture</p>
                </div>
              </div>
              <div className="freelancer-info">
                <h1>Your Staff Room Profile</h1>
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
                <div className="btn">
                  <input type="submit" value="See what gigs are going" />
                </div>
              </div>
            </>
          );
        })()}
    </div>
  );
}
