//Native imports
import { useEffect, useState } from "react";

//External imports
import Button from "react-bootstrap/Button";
import Carousel from "react-elastic-carousel";
import moment from "moment";
import axios from "axios";

//Internal imports
import "../../styles/carousel.scss";
import API_URL from "../../services/external-api/Adzuna";
import ExtApiCard from "./ExtApiCarouselCardModal";

// breakpoints for elastic carousel
const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
];

export default function ExtApiCarousel() {
  const [apiJobs, setApiJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      console.log('===================axios=================');
      console.log(result.data.results);
      console.log('====================================');
      setApiJobs(result.data.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (

    <div className="jobs-carousel">
      {loading ? (
        <div className="text-center">
          <img
            src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
            alt="img"
          />
        </div>
      ) : (

        <div className="carousel-wrapper">
          <Carousel breakPoints={breakPoints}>
            {apiJobs.slice(0, 40).map((job) => (
              <ExtApiCard job={job} key={job.id} />
            ))}
          </Carousel>
        </div>
      )}
      <hr className="separator" />
    </div>
  );
}