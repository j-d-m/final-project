import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";
import CompanyUpdateProfile from "./CompanyUpdateProfile";
import { Button } from "react-bootstrap";
import DeleteCompanyAccount from "./DeleteCompanyAccount";
import "../../../styles/companyProfile.scss";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { GiCook } from "react-icons/gi";

export default function CompanyProfile() {
  const [companyImage, setCompanyImage] = useState(null);
  const navigate = useNavigate();
  const { companyLoginData, setCompanyLoginData } = useContext(MyContext);
  const [modalShow, setModalShow] = useState();
  const [modalShow1, setModalShow1] = useState();

  const { loading, error, data } = useQuery(GET_ONE_COMPANY, {
    variables: { getOneCompanyId: companyLoginData.id },
  });

  if (loading) {
    return <p>is loading</p>;
  }

  setTimeout(() => {
    if (data) {
      setCompanyLoginData(data.getOneCompany);
    }
  }, 100);

  return (
    <section className="Profile-Container-Comp">
      <div className="Banner-Container-Comp">
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
                <div className="Freelance-Avatar-Comp">
                  {/* <div
                  className="company-background"
                  style={{
                    backgroundImage: `url(https://loremflickr.com/320/240/${company_type})`,
                    
                  }}
                ></div> */}
                  <img src={avatar} alt="img" width="200px" height="200px" />
                  <label htmlFor="file-upload" className="Custom-File-Upload">
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      onChange={(e) => setCompanyImage(e.target.files[0])}
                    />
                    Change Image
                  </label>
                </div>

                <div className="Freelance-Right-Comp">
                  <h1>{company_Name}</h1>

                  <div>
                    <p>Company type : {company_type} </p>
                  </div>
                  <div>
                    <p>Company address : {address} </p>
                  </div>
                  <div>
                    <p>Owner : {owner_name}</p>
                  </div>
                  <div>
                    <p>Email : {email}</p>
                  </div>
                  <div>
                    <p>Phone : {phone}</p>
                  </div>
                  <div>
                    <p>Company Description : {description} </p>
                  </div>
                  <section>
                    <div className="ModalBtnCompanyProfile">
                      <Button
                        id={id}
                        className="btn btn-secondary btn-circle btn-xl"
                        onClick={() => {
                          setModalShow(true);
                        }}
                      >
                        <AiOutlineEdit />
                        <span>Edit</span>
                      </Button>

                      <CompanyUpdateProfile
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                      <Button
                        id={id}
                        className="btn btn-secondary btn-circle btn-xl"
                        onClick={() => {
                          setModalShow1(true);
                        }}
                      >
                        <AiOutlineDelete />
                        <span>Delete</span>
                      </Button>

                      <DeleteCompanyAccount
                        show={modalShow1}
                        onHide={() => setModalShow1(false)}
                      />
                      <Button
                        value="Post a Job"
                        className="btn btn-secondary btn-circle btn-xl"
                        onClick={() => navigate("/company-profile/create-job")}
                      >
                        <AiOutlinePlusCircle />
                        <span>Create</span>
                      </Button>
                      <Button
                        value="Check freelancers"
                        onClick={() => navigate("/freelancer-list")}
                        className="btn btn-secondary btn-circle btn-xl"
                      >
                        <GiCook />
                        <span>Staff</span>
                      </Button>
                      <Button
                        value="Jobs List"
                        onClick={() =>
                          navigate("/company-profile/company-jobs")
                        }
                        className="btn btn-secondary btn-circle btn-xl"
                      >
                        <AiOutlineUnorderedList />
                        <span>Jobs</span>
                      </Button>
                    </div>
                  </section>
                </div>
              </>
            );
          })()}
      </div>
    </section>
  );
}
