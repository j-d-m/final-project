import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";

export default function CompanyProfile() {
  const { companyLoginData } = useContext(MyContext);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ONE_COMPANY, {
    variables: { getOneCompanyId: companyLoginData.companyId },
    // pollInterval: 500,
  });

  if (loading)
    return (
      <img
        src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
        alt="img"
      />
    );
  let {
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
    <div className="company-profile">
      <div className="company-avatar">
        <img src={avatar} alt="img" width="200px" height="200px" />
        <div>
          <input type="file" />
          <p>Upload your picture</p>
        </div>
      </div>

      <div className="company-info">
        <h1>Your Company profile</h1>
        <div>
          <p>Company name : {company_Name}</p>
        </div>
        <div>
          <p>Company type : {company_type}</p>
        </div>
        <div>
          <p>Company address : {address}</p>
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
          <p>Company Description : {description}</p>
        </div>
        <div className="btn">
          <input
            type="submit"
            value="Post a Job"
            onClick={() => navigate("/company-profile/create-job")}
          />

          <input type="submit" value="Check out the freelancers" />
        </div>
      </div>
    </div>
  );
}
