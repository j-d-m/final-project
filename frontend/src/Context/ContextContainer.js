import React, { useState } from "react";
import { MyContext } from "./Context";

function ContextContainer({ children }) {
  const [user, setUser] = useState(false);
  const [freelancer, setFreelancer] = useState();



  return (
    <MyContext.Provider value={{ user, setUser, setFreelancer }}>
      {children}
    </MyContext.Provider>
  );
}

export default ContextContainer;
