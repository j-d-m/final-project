//Native imports

//External imports
import { useQuery } from "@apollo/client";
import Carousel from "react-elastic-carousel";

//Internal imports
import "../../styles/carousel.scss";
import { GET_JOBS } from "../../graphQL/Queries";
import IntApiCard from "./IntApiCarouselCardModal";

// breakpoints for elastic carousel
const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
];

export default function IntApiCarousel() {
  const { data, error } = useQuery(GET_JOBS);

  if (error) {
    return (
      <div>
        <p>Currently there are no Job Available</p>
      </div>
    );
  }

  return (
    <div className="jobs-carousel">
      <hr className="separator" />
      <div className="carousel-wrapper">
        <Carousel
          enableMouseSwipe={false}
          easing="cubic-bezier(1,.15,.55,1.54)"
          tiltEasing="cubic-bezier(0.110, 1, 1.500, 0.210)"
          transitionMs={1500}
          breakPoints={breakPoints}>

          {data.getJobs.slice(0, 40).map((job) => (
            <IntApiCard job={job} key={job.id} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
