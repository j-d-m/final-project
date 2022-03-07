import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";
import CompanyUpdateProfile from "./CompanyUpdateProfile";
import { Button } from "react-bootstrap";
import DeleteCompanyAccount from "./DeleteCompanyAccount";
/*  
1- we need here to update the company profile using mutation 
this is done 

2- update  company avatar as well
*/
export default function CompanyProfile() {
  const [modalShow, setModalShow] = useState();
  const [modalShow1, setModalShow1] = useState();
  const navigate = useNavigate();
  const { companyLoginData } = useContext(MyContext);
  const { loading, error, data } = useQuery(GET_ONE_COMPANY, {
    variables: { getOneCompanyId: companyLoginData.id },
  });

  if (loading) {
    return <p>is loading</p>;
  }

  console.log(data);
  return (
    <div className="company-profile ">
      {data &&
        (() => {
          let {
            id,
            company_Name,
            owner_name,
            address,
            company_type,
            description,
            email,
            phone,
            avatar,
          } = data.getOneCompany;
          return (
            <>
              <div className="avatarContainer">
                <div
                  className="company-background"
                  style={{
                    backgroundImage: `url(https://loremflickr.com/320/240/${company_type})`,
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
                <div className="ModalBtnCompanyProfile">
                  <Button
                    id={id}
                    variant="primary"
                    onClick={() => {
                      setModalShow(true);
                    }}
                  >
                    Edit Profile
                  </Button>

                  <CompanyUpdateProfile
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                  <Button
                    id={id}
                    variant="primary"
                    onClick={() => {
                      setModalShow1(true);
                    }}
                  >
                    Delete Account
                  </Button>

                  <DeleteCompanyAccount
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                  />
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
