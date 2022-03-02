import React, { useState } from "react";
import { MyContext } from "./Context";

function ContextContainer({ children }) {
  const [user, setUser] = useState(false);
  const [freelancer, setFreelancer] = useState();
  const [freelancerLoginData, setFreelancerLoginData] = useState({});
  const [companyLoginData, setCompanyLoginData] = useState({});
  const [isCompanyLogin, setIsCompanyLogin] = useState(false);
  const [isFreelancerLogin, setIsFreelancerLogin] = useState(false);
  const [isTitleFilter, setIsTitleFilter] = useState(false);
  const [inputValue, setInputValue] = useState([]);

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        setFreelancer,
        companyLoginData,
        setCompanyLoginData,
        isCompanyLogin,
        setIsCompanyLogin,
        isFreelancerLogin,
        setIsFreelancerLogin,
        freelancerLoginData,
        setFreelancerLoginData,
        isTitleFilter,
        setIsTitleFilter,
        inputValue,
        setInputValue,
        
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextContainer;
