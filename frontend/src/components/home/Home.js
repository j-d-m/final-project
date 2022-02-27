//Native imports
import React, { useEffect, useState } from "react";

//External imports
import { useQuery } from "@apollo/client";

//Internal imports
import { GET_JOBS } from "../../graphQL/Queries";
import JobsFromExternalApi from "./JobsFromExternalApi";
import JobsFromInternalApi from "./JobsFromInternalApi";



export default function Home() {
  const { data, loading, error } = useQuery(GET_JOBS);

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
    <>
      <div className=" jobCardContainer">
        {data.getJobs.map((job) => {
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
                    className="btn btn-primary "
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="jobs-combo-box" >
        <JobsFromInternalApi />
        <JobsFromInternalApi />
        <JobsFromExternalApi />
      </div>

    </>
  );


}
