import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./Context";

function ContextContainer({ children }) {
  const [companyLoginData, setCompanyLoginData] = useState({});
  const [isCompanyLogin, setIsCompanyLogin] = useState(false);
  const [isFreelancerLogin, setIsFreelancerLogin] = useState(false);
  const [isTitleFilter, setIsTitleFilter] = useState(false);
  const [inputValue, setInputValue] = useState([]);
  const [freelancerLoginData, setFreelancerLoginData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://deploy-final-project-anass.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        query: `query{
          getVerify{
          user{
          first_name
          last_name
          avatar
          email
          phone
          password
          hourly_rate
          description
          id
        }
          company{
          company_Name
          owner_name
          avatar
          company_type
          id
          address
          phone
          email
          password
          description
	
        }


        }
        }
      
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data.getVerify?.user) {
          setFreelancerLoginData(result.data.getVerify.user);
          setIsFreelancerLogin(true);
        } else if (result.data.getVerify?.company) {
          setCompanyLoginData(result.data.getVerify.company);
          setIsCompanyLogin(true);
        } else {
          navigate("/");
        }
      });
  }, []);
  return (
    <MyContext.Provider
      value={{
        companyLoginData,
        setCompanyLoginData,
        isCompanyLogin,
        setIsCompanyLogin,
        isFreelancerLogin,
        setIsFreelancerLogin,
        isTitleFilter,
        setIsTitleFilter,
        inputValue,
        setInputValue,
        setFreelancerLoginData,
        freelancerLoginData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextContainer;
