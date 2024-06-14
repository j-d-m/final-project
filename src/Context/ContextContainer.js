import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./Context";

/**
 * ContextContainer component manages and provides application-wide state and context.
 * It fetches user or company data on mount and sets various state variables accordingly.
 * The context provider makes these state variables and their setters available to any
 * component that needs them.
 */

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

  // Fetch user or company data when the component mounts
  useEffect(() => {
    fetch("https://final-project-backend-chi.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        query: `
          query {
            getVerify {
              user {
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
              company {
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
          // If user data is returned, set the user state and login status
          setFreelancerLoginData(result.data.getVerify.user);
          setIsFreelancerLogin(true);
        } else if (result.data.getVerify?.company) {
          // If company data is returned, set the company state and login status
          setCompanyLoginData(result.data.getVerify.company);
          setIsCompanyLogin(true);
        } else {
          // If no data is returned, navigate to a fallback page
          navigate(1); // Changed to navigate(1) instead of navigate("/") to avoid affecting the notFound page
        }
      });
  }, [navigate]);

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
