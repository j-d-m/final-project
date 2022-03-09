import React, { useContext, useState } from "react";
import { MyContext } from "../../../../Context/Context";
import CompanyUpdateJobs from "../company-update-jobs/CompanyUpdateJobs";
import DeleteJob from "./DeleteJob";

function CompanyJobs() {
  const [modalShow, setModalShow] = useState();
  const [modalShow1, setModalShow1] = useState();
  const [companyJobId, setCompanyJobId] = useState();
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
              <h1>{job_Title}</h1>
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
                  <input
                    type="button"
                    value=" Edit Job"
                    id={id}
                    variant="primary"
                    onClick={() => {
                      setModalShow(true);
                      setCompanyJobId(id);
                    }}
                  />
                  <CompanyUpdateJobs
                    show={modalShow}
                    job={companyJobId}
                    onHide={() => setModalShow(false)}
                  />
                  <input
                    type="button"
                    value="Delete Job"
                    id={id}
                    variant="primary"
                    onClick={() => {
                      setModalShow1(true);
                      setCompanyJobId(id);
                    }}
                  />
                  <DeleteJob
                    show={modalShow1}
                    job={companyJobId}
                    onHide={() => setModalShow1(false)}
                  />
                </div>
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default CompanyJobs;
