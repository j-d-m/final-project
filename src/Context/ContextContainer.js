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
  const [freelancerFind, setFreelancerFind] = useState({});
  const [oneCompanyJob, setOneCompanyJob] = useState({});
  const [jobAccepted, setJobAccepted] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        query: `query{
          getVerify{
          user{
          id
          first_name
          last_name
          avatar
          email
          phone
          password
          hourly_rate
          description
          favorite {
        id
        job_Title
        job_description
        end_Date
        start_Date
      }
          
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
       jobs {
        id
        job_Title
        start_Date
        end_Date
        issued_At
        num_of_people_needed
        job_description
      }
            favorite {
        first_name
        last_name
        avatar
        email
        description
      }
	
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
          // console.log(
          //   "================FROM: ContextContainer.js===================="
          // );
          // console.log(companyLoginData);
          // console.log("====================================");
        } else {
          navigate(1); //changed to navigate(1), instead of navigate("/") because it was affecting the notFound page
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
        freelancerFind,
        setFreelancerFind,
        oneCompanyJob,
        setOneCompanyJob,
        jobAccepted,
        setJobAccepted,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextContainer;
