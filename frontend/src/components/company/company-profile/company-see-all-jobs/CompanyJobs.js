import React, { useContext } from "react";
import { MyContext } from "../../../../Context/Context";

function CompanyJobs() {
  const { companyLoginData } = useContext(MyContext);
  return (
    <div className="companyJobs">
      <h1> Jobs List</h1>
      {companyLoginData.jobs &&
        companyLoginData.jobs.map((job) => {
          let {
            id,
            job_Title,
            start_Date,
            end_Date,
            job_description,
            num_of_people_needed,
          } = job;
          return (
            <div
              className="jobsCard"
              key={id}
              style={{
                backgroundImage: `url(https://source.unsplash.com/1600x900/?${job_Title})`,
              }}
            >
              <h1>{job_Title.toUpperCase()}</h1>
              <ul>
                <li>
                  Start : <span>{start_Date}</span>
                </li>
                <li>
                  End : <span> {end_Date}</span>
                </li>
                <li>
                  Needed : <span> {num_of_people_needed} people</span>
                </li>
                <li>
                  Description : <span> {job_description}</span>
                </li>
                <div className="modifyJobsButton">
                  <input type="button" value="Update Job" />
                  <input type="button" value="Delete Job" />
                </div>
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default CompanyJobs;
