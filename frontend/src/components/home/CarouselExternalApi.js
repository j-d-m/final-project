//Native imports
import React, { useEffect, useState } from "react";

//External imports
import Button from "react-bootstrap/Button";
import Carousel from "react-elastic-carousel";
import moment from "moment";

//Internal imports
// import Adzuna from "../../services/external-api/Adzuna";
import API_URL from "../../services/external-api/Adzuna";
import "../../styles/carousel.scss";

const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1 },
  { width: 768, itemsToShow: 3, itemsToScroll: 1 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 1 },
];

function CarouselExternalApi() {
  const [apiJobs, setApiJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();

      // console.log('=============JOBS ARRAY=======================');
      // console.log(data);
      // console.log('====================================');

      setApiJobs(data.results);
    };
    fetchData();
  }, []);

  let charLimitCompany = 30;
  let charLimitTitle = 30;

  return (
    <div className="jobs-carousel">
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {apiJobs.map((job) => (
            <div className="carousel-card" key={job.id}>
              <h5>
                {" "}
                {job.title.slice(0, charLimitTitle) +
                  (job.title.length > charLimitTitle ? "..." : "")}
              </h5>
              {/* <h4>{(job.company.display_name).slice(0, charLimitCompany) + ((job.company.display_name).length > charLimitCompany ? "..." : "")}</h4> */}
              <p p> {job.location.display_name}</p>
              <p>posted {moment(job.created).fromNow()}</p>
              <p>
                by{" "}
                <strong>
                  {" "}
                  {job.company.display_name.slice(0, charLimitCompany) +
                    (job.company.display_name.length > charLimitCompany
                      ? "..."
                      : "")}{" "}
                </strong>
              </p>

              <div className="text-center">
                <Button
                  variant="secondary"
                  size="md"
                  href={job.redirect_url}
                  target="_blank"
                >
                  Accept Job
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <hr className="separator" />
    </div>
  );
}

export default CarouselExternalApi;
