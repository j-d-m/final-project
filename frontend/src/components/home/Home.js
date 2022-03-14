//Native imports
import React, { useContext } from "react";

//External imports
import { useQuery } from "@apollo/client";
import Swal from "sweetalert2";

// Internal imports
import "../../styles/home.scss";
import { MyContext } from "../../Context/Context";
import { GET_JOBS } from "../../graphQL/Queries";
import exclamation from "../../assets/img/exclamation.ico";
import IntApiCarousel from "./IntApiCarousel";
import ExtApiCarousel from "./ExtApiCarousel";
import FreelancerHome from "./FreelancerHome";
import ThreeSteps from "./ThreeSteps";
import SearchCard from "./SearchCard";

export default function Home() {
  const { loading, error, data } = useQuery(GET_JOBS);

  const {
    isTitleFilter,
    setIsTitleFilter,
    inputValue,
    setInputValue,
    isCompanyLogin,
  } = useContext(MyContext);

  const searchHandler = (e) => {
    e.preventDefault();
    let inputTitleValue = e.target.searchJobTitle.value;

    let filterTitle = data.getJobs.filter(item => item.job_Title.toLowerCase().includes(inputTitleValue.toLowerCase()) ||
      item.job_description.toLowerCase().includes(inputTitleValue.toLowerCase()) ||
      item.created_by.company_Name.toLowerCase().includes(inputTitleValue.toLowerCase()));

    if (inputTitleValue.length > 0 && filterTitle.length > 0) {
      setInputValue(filterTitle);
      setIsTitleFilter(true);
    } else {
      Swal.fire({
        position: "top",
        // icon: "error",
        iconHtml: `<img src=${exclamation}>`,
        // < a href = "https://www.vecteezy.com/free-vector/do-not-disturb-icon" > Do Not Disturb Icon Vectors by Vecteezy</ >
        title: "We could not find a job with this title.",
        // text: "We could not find a job with this title.",
        showConfirmButton: false,
        timer: 1000,
      });
      setIsTitleFilter(false);
    }
  };

  if (loading) {
    return (
      <div className="m2-auto text-center loading-block">
        <img
          src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
          alt="img"
        />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>No Job Available</h1>
      </div>
    );
  }

  return (
    <>
      {isCompanyLogin ? (
        <FreelancerHome />
      ) : (
        <div className=" homeContainer">
          <section className="jobSearchContainer">
            <div className="banner-container">
              <div className="search-fields">
                <form onSubmit={searchHandler}>
                  <input
                    name="searchJobTitle"
                    type="text"
                    placeholder="Search by job title, description or company name"
                  />
                  <input
                    className="search-button"
                    type="submit"
                    value="Search Jobs"
                  />
                </form>
              </div>
            </div>
            <div className="jobSearchBox">
              {isTitleFilter &&
                inputValue.slice(0, 20).map((job) => (
                  <SearchCard job={job} key={job.id} />
                ))}
            </div>
          </section>
          <div className="jobs-combo-box">
            <IntApiCarousel />
            <ThreeSteps />
            {/* <ExtApiCarousel /> */}
          </div>
        </div>
      )}
    </>
  );
}
