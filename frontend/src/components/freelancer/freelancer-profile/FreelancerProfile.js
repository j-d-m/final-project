import React, { useContext } from "react";
import { MyContext } from "../../../Context/Context";
import '../../../styles/freelancerProfileStyle.scss';



export default function FreelancerProfile() {
  const { freelancerLoginData } = useContext(MyContext);
  console.log(freelancerLoginData);

  if (!freelancerLoginData)
    return (
      <img
        src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
        alt="img"
      />
    );

  return (
    <section className="Profile-Container">
    <div className="Banner-Container">
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
              <div className="Freelance-Avatar">
                <img src={avatar} alt="img" width="200px" height="200px" />
                  <label for='file-upload' className="Custom-File-Upload">
                        <input id="file-upload" type="file" /> Change Image

                  </label>
                     
              </div>

              <div className="Freelance-Right">
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
                <div className="">
                  <input type="submit" value="See what gigs are going on" />
                </div>
              </div>
            </>
          );
        })()}
    </div>
    </section>
  );
}
