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
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: `query{
          getVerify{
        user{
        userId
        company{
          company_Name
          email
              }
            }
         token
          }
        }
      
        `,
      }),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCompanyLoginData({ companyId: result.data.getVerify.user.userId });
        setFreelancerLoginData(result.data.getVerify.user.userId);

        setIsCompanyLogin(true);
        // setIsFreelancerLogin(true);
        // navigate("/");
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
