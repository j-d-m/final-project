import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { MyContext } from "../../../Context/Context";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";
import "../../../styles/_companyProfile.scss";
export default function CompanyProfile() {
  const { companyLoginData } = useContext(MyContext);

  const { loading, error, data } = useQuery(GET_ONE_COMPANY, {
    variables: { getOneCompanyId: companyLoginData.companyId },
    // pollInterval: 500,
  });
  console.log(data);
  if (loading)
    return (
      <img
        src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
        alt="img"
      />
    );
  let {
    company_Name,
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
        <img src={avatar} alt="img" width="200px" />
        <div>
          <input type="file" />
          <p>upload your picture</p>
        </div>
      </div>

      <div className="company-info">
        <h1>Company Profile</h1>
        <div>
          <p>company address : {address}</p>
        </div>
        <div>
          <p>company address : {address}</p>
        </div>
      </div>
    </div>
  );
}
