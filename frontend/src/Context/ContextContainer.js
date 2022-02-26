import React, { useState } from "react";
import { MyContext } from "./Context";

function ContextContainer({ children }) {
  const [user, setUser] = useState(false);
  const [freelancer, setFreelancer] = useState();
  const [companyLoginData, setCompanyLoginData] = useState({});
  const [isCompanyLogin, setIsCompanyLogin] = useState(false);
  const [isFreelancerLogin, setIsFreelancerLogin] = useState(false);
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
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextContainer;
