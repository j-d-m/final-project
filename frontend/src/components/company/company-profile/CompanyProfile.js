import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/Context";

/*  
1- we need here to update the company profile using mutation 
2- update  company avatar as well
*/
export default function CompanyProfile() {
  const { companyLoginData } = useContext(MyContext);
  const navigate = useNavigate();
  if (!companyLoginData) {
    return navigate("/company-login");
  }

  return (
    <div className="company-profile ">
      {companyLoginData &&
        (() => {
          let {
            company_Name,
            owner_name,
            address,
            company_type,
            description,
            email,
            phone,
            avatar,
          } = companyLoginData;
          return (
            <>
              <div className="avatarContainer">
                <div
                  className="company-background"
                  style={{
                    backgroundImage: `url(https://loremflickr.com/320/240/${company_type})`,
                    webkitClipPath: "polygon(100% 0%, 0% 0%, 100%,100%)",
                    clipPath: "polygon(100% 0%, 0% 0%, 100% 200%)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="company-avatar">
                  <img src={avatar} alt="img" width="150px" height="150px" />
                </div>
              </div>
              <div className="companyName">
                <h1>{company_Name}</h1>
              </div>
              <div className="company-info">
                <div>
                  <p>Company type :</p>
                  <span> {company_type}</span>
                </div>
                <div>
                  <p>Company address :</p>
                  <span>{address}</span>
                </div>
                <div>
                  <p>Owner :</p>
                  <span> {owner_name}</span>
                </div>
                <div>
                  <p>Email :</p>
                  <span>{email}</span>
                </div>
                <div>
                  <p>Phone :</p>
                  <span>{phone}</span>
                </div>
                <div>
                  <p>Company Description :</p>
                  <span>{description}</span>
                </div>
                <div className="Btn">
                  <input
                    type="submit"
                    value="Post a Job"
                    onClick={() => navigate("/company-profile/create-job")}
                  />

                  <input
                    type="submit"
                    value="Check freelancers"
                    onClick={() => navigate("/home")}
                  />
                  <input
                    type="submit"
                    value="Jobs List"
                    onClick={() => navigate("/company-profile/company-jobs")}
                  />
                </div>
              </div>
            </>
          );
        })()}
    </div>
  );
}
