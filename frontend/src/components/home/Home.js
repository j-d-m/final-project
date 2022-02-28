import { useQuery } from "@apollo/client";
import { logMissingFieldErrors } from "@apollo/client/core/ObservableQuery";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MyContext } from "../../Context/Context";
import { GET_JOBS } from "../../graphQL/Queries";
import JobsFromExternalApi from "./JobsFromExternalApi";
import JobsFromInternalApi from "./JobsFromInternalApi";
import '../../styles/home.scss';

export default function Home() {
  const { data, loading, error } = useQuery(GET_JOBS);

  const { isTitleFilter, setIsTitleFilter, inputValue, setInputValue } = useContext(MyContext)


  const searchHandler = (e) => {
    e.preventDefault()
    let inputTitleValue = e.target.searchJobTitle.value

    const filterTitle = data.getJobs.filter((item) => item.job_Title === inputTitleValue);
    // console.log(filterTitle[0].job_description);

    if (filterTitle.length > 0) {
      setInputValue(filterTitle)
      setIsTitleFilter(true)
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error",
        text: "We could not find a job with this title.",
        showConfirmButton: false,
        timer: 2000,

      });
    }

  }

  if (loading) {
    return (
      <div className="m2-auto text-center">
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
    <div className=" jobCardContainer">
      <section className="home-container">
        <div className="banner-container">
          <div className="search-fields">
            <form onSubmit={searchHandler} >
              <input name="searchJobTitle" type="text" placeholder="job title... " />
              <input className="search-button" type="submit" value="Search Jobs" />
            </form>
          </div>
        </div>
      </section>

      {isTitleFilter ? inputValue.map((job) => {
        return (
          <div key={job.id} className=" CardDiv ">
            <div className="card-body">
              <img
                src={`https://source.unsplash.com/1600x900/?${job.job_Title}`}
                alt="img"
              />

              <p>Title : {job.job_Title}</p>
              <p>Description : {job.job_description}</p>
              <p>Number Needed :{job.num_of_people_needed}</p>
              <p>issued at :{job.issued_At}</p>
              <div>
                <h4>created by : {job.created_by.company_Name}</h4>
                <p>email : {job.created_by.email}</p>
              </div>
              <div className="text-center">
                <input
                  type="button"
                  value="Accept Job"
                  className="btn btn-secondary"

                />
              </div>
            </div>
          </div>
        );
      }) : data.getJobs.map((job) => {
        return (
          <div key={job.id} className=" CardDiv ">
            <div className="card-body">
              <img
                src={`https://source.unsplash.com/1600x900/?${job.job_Title}`}
                alt="img"
              />

              <p>Title : {job.job_Title}</p>
              <p>Description : {job.job_description}</p>
              <p>Number Needed :{job.num_of_people_needed}</p>
              <p>issued at :{job.issued_At}</p>
              <div>
                <h4>created by : {job.created_by.company_Name}</h4>
                <p>email : {job.created_by.email}</p>
              </div>
              <div className="text-center">
                <input
                  type="button"
                  value="Accept Job"
                  className="btn btn-secondary"

                />
              </div>
            </div>
          </div>
        );
      })}
      <div className="jobs-combo-box" >
        <JobsFromInternalApi />
        <JobsFromExternalApi />
      </div>
    </div>
  );
}


