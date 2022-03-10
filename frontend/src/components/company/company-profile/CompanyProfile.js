import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";
import CompanyUpdateProfile from "./CompanyUpdateProfile";
import { Button } from "react-bootstrap";
import DeleteCompanyAccount from "./DeleteCompanyAccount";
import '../../../styles/companyProfile.scss';

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
  useEffect(() => {
    if (!companyLoginData) {
      navigate("/company-login");
    }
  }, [companyLoginData]);
  const { loading, error, data } = useQuery(GET_ONE_COMPANY, {
    variables: { getOneCompanyId: companyLoginData.id },
  });

  if (loading) {
    return <p>is loading</p>;
  }

  return (
    <section className="Profile-Container">
      <div className=".Banner-Container">
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
              <div className="Freelance-Avatar">
                {/* <div
                  className="company-background"
                  style={{
                    backgroundImage: `url(https://loremflickr.com/320/240/${company_type})`,
                    
                  }}
                ></div> */}
                <img src={avatar} alt="img" width="200px" height="200px" />
                  <label htmlFor="file-upload" className="Custom-File-Upload">
                    <input id="file-upload" type="file" /> Change Image
                  </label>
              </div>


              <div className="Freelance-Right">
                    <h1>{company_Name}</h1>
                  
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
                  <section>
                  
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
                 </section>

                </div>
              </div>
            </>
          );
        })()}
        </div>
    </section>
  );
}
