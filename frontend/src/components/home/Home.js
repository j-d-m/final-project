import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_JOBS } from "../../graphQL/Queries";
import '../../styles/home.scss';


// import Adzuna from "../../services/external-api/Adzuna";
// import API_URL from "../../services/external-api/Adzuna";

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
    <div className=" jobCardContainer">

<section className="home-container">
      <div className="banner-container">
        <div className="search-fields">
          <form >
            <input type="text"  placeholder="job title or company name... " />
            <button type="submit"> Search Jobs</button>
          </form>
        </div>
      </div>
      </section>


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
                  className="btn btn-secondary"
                  
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // const [jobs, setJobs] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(API_URL);
  //     const data = await response.json();

  //     // console.log('=============JOBS ARRAY=======================');
  //     // console.log(data);
  //     // console.log('====================================');

  //     setJobs(data.results);
  //   };
  //   fetchData();
  // }, []);

  // return (
  //   <div style={{ height: "100%", width: "100vw", backgroundColor: "#C9cbfb" }}>
  //     <h1
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "75vh",
  //       }}
  //     >
  //       Home (placeholder)
  //     </h1>

  //     <ul>
  //       {jobs.map((job) => (
  //         <li key={job.id}>
  //           <h4>Company: {job.company.display_name} </h4>
  //           <h5 style={{ textAlign: "center" }}>{job.title}</h5>
  //           <h6>{job.category.label}</h6>
  //           <p style={{ fontSize: "14px" }}>{job.description}</p>
  //           <em>
  //             {" "}
  //             <p>
  //               LOCATION: {job.location.display_name} / POSTED ON: {job.created}{" "}
  //               / SOUNDS GOOD? <a href={job.redirect_url}>Apply Here</a>{" "}
  //             </p>{" "}
  //           </em>

  //           <hr />
  //           <hr />
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}
