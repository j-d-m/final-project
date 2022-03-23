//Native imports
import React, { useContext, useRef, useState } from "react";

//External imports
import { useQuery } from "@apollo/client";
import Swal from "sweetalert2";

// Internal imports
import "../../styles/home.scss";
import "../../styles/_sweetAlert.scss";
import background1 from "../../assets/img/homeBg1.jpg";
import background2 from "../../assets/img/homeBg2.jpg";
import background3 from "../../assets/img/homeBg3.jpg";
import background4 from "../../assets/img/homeBg4.jpg";
import background5 from "../../assets/img/homeBg5.jpg";

import { MyContext } from "../../Context/Context";
import { GET_JOBS } from "../../graphQL/Queries";
import exclamation from "../../assets/img/exclamation.ico";
import IntApiCarousel from "./IntApiCarousel";
import ExtApiCarousel from "./ExtApiCarousel";
import FreelancerHome from "./FreelancerHome";
import ThreeSteps from "./ThreeSteps";
import SearchCard from "./SearchCard";
import "animate.css";

export default function Home() {
  const [inp, setInp] = useState("");
  const BgArray = [
    background1,
    background2,
    background3,
    background4,
    background5,
  ];
  const randomBg = function () {
    return Math.floor(Math.random() * 5);
  };
  const resultBg = BgArray[randomBg()];

  const { loading, error, data } = useQuery(GET_JOBS);

  const { isTitleFilter, setIsTitleFilter } = useContext(MyContext);
  const inputRef = useRef();
  let filterTitle =
    inp &&
    data.getJobs.filter(
      (item) =>
        item.job_Title.toLowerCase().includes(inp.toLowerCase()) ||
        item.job_description.toLowerCase().includes(inp.toLowerCase()) ||
        item.created_by.company_Name.toLowerCase().includes(inp.toLowerCase())
    );

  const searchHandler = (e) => {
    e.preventDefault();
    setInp(inputRef.current.value);

    if (inputRef.current.value.length > 0) {
      setIsTitleFilter(true);
    } else {
      Swal.fire({
        position: "top",
        // icon: "error",
        iconHtml: `<img src=${exclamation}>`,
        title: "No job found",
        // text: "We could not find a job with this title.",
        showConfirmButton: false,
        timer: 2000,
      });
      setIsTitleFilter(false);
    }
    document.getElementById("reset-form").reset();
  };

  if (loading) {
    return (
      <div className="m2-auto text-center loading-block">
        <h1>loading....</h1>
        <img
          src="https://cdn.dribbble.com/users/924068/screenshots/3757746/media/6035d641a7d26f1ba75421d15ce173cf.gif"
          alt="img"
        />
      </div>
    );
  }
  if (error) {
    console.log("========GraphQL Fetch Error============================");
    console.log(error);
    console.log("====================================");
  }

  return (
    <>
      <div className=" homeContainer">
        <section className="jobSearchContainer">
          <div
            className="banner-container"
            style={{
              backgroundImage: `url(' ${resultBg}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              animation: "fadeIn 3s ease-in-out",
            }}
          >
            {/* flying texts */}
            <h4 className="animate__animated animate__fadeInLeftBig animate__delay-2s animate__slow">
              {" "}
              GASTRONOMY JOBS
            </h4>
            <h5 className="animate__animated animate__fadeInLeftBig animate__delay-3s animate__slower">
              {" "}
              PEOPLE WHEN YOU NEED
            </h5>
            {/* searchbar and button starts*/}
            <div className="search-fields">
              <form onSubmit={searchHandler} id="reset-form">
                <input
                  name="searchJobTitle"
                  type="text"
                  placeholder=" Search by job title, description or company name"
                  ref={inputRef}
                />
                <input
                  className="search-button"
                  type="submit"
                  value="Search Jobs"
                />
              </form>
            </div>
            {/* searchbar and button ends*/}
          </div>
          <div className="jobSearchBox">
            {isTitleFilter &&
              filterTitle &&
              filterTitle
                .slice(0, 20)
                .map((job) => <SearchCard job={job} key={job.id} />)}
          </div>
        </section>
        <div className="jobs-combo-box">
          <IntApiCarousel />
          <ThreeSteps />
          {/* <ExtApiCarousel /> */}
        </div>
      </div>
    </>
  );
}
