import React, { useEffect, useState } from "react";

// import Adzuna from '../../services/external-api/Adzuna'
import API_URL from "../../services/external-api/Adzuna";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();

      // console.log('=============JOBS ARRAY=======================');
      // console.log(data);
      // console.log('====================================');

      setJobs(data.results);
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: "100%", width: "100vw", backgroundColor: "#C9cbfb" }}>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        Home (placeholder)
      </h1>

      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h4>Company: {job.company.display_name} </h4>
            <h5 style={{ textAlign: "center" }}>{job.title}</h5>
            <h6>{job.category.label}</h6>
            <p style={{ fontSize: "14px" }}>{job.description}</p>
            <em>
              {" "}
              <p>
                LOCATION: {job.location.display_name} / POSTED ON: {job.created}{" "}
                / SOUNDS GOOD? <a href={job.redirect_url}>Apply Here</a>{" "}
              </p>{" "}
            </em>

            <hr />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
