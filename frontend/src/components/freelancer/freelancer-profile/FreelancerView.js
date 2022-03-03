import React, { useContext } from "react";
import { MyContext } from "../../../Context/Context";
import "../../../styles/_freelancerView.scss";
export default function FreelancerView() {
  const { freelancerFind } = useContext(MyContext);
  return (
    <div className="freelancerView">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card">
          <div className="upper">
            <img
              src="https://i.imgur.com/Qtrsrk5.jpg"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="user text-center">
            <div className="profile">
              <img
                src={freelancerFind.avatar}
                alt="img"
                className="rounded-circle"
                width="80"
              />
            </div>
          </div>
          <div className="mt-5 text-center">
            <h4 className="mb-0">{`${freelancerFind.first_name} ${freelancerFind.last_name}`}</h4>
            <span className="text-muted d-block mb-2">
              {freelancerFind.email}
            </span>
            <button className="btn btn-primary btn-sm follow">Follow</button>
            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
              <div className="stats">
                <h6 className="mb-0">Hourly_rate</h6>
                <span>{freelancerFind.hourly_rate}</span>
              </div>
              <div className="stats">
                <h6 className="mb-0">Projects</h6> <span>142</span>
              </div>
              <div className="stats">
                <h6 className="mb-0">Ranks</h6> <span>129</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
