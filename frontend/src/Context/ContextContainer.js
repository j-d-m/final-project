import React, { useState } from "react";
import { MyContext } from "./Context";

function ContextContainer({ children }) {
  const [user, setUser] = useState(false);
  const [freelancer, setFreelancer] = useState();
  const [companyLoginData, setCompanyLoginData] = useState();

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        setFreelancer,
        companyLoginData,
        setCompanyLoginData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextContainer;
