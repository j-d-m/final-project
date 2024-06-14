// ** Native imports
// import { useEffect, useState } from "react";

// ** External imports
// import Button from "react-bootstrap/Button";
// import Carousel from "react-elastic-carousel";
// import moment from "moment";
// import axios from "axios";

// ** Internal imports
// import "../../styles/carousel.scss";
// import API_URL from "../../services/external-api/Adzuna";
// import ExtApiCard from "./ExtApiCarouselCardModal";

// // Breakpoints for elastic carousel
// const breakPoints = [
//   { width: 1, itemsToShow: 1, itemsToScroll: 1 },
//   { width: 550, itemsToShow: 2, itemsToScroll: 2 },
//   { width: 768, itemsToShow: 3, itemsToScroll: 3 },
//   { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
// ];

// /**
//  * ExtApiCarousel component fetches job data from an external API and displays it in a carousel.
//  **! Note: This component is not being used in the current version of the project.
//  */
// export default function ExtApiCarousel() {
//   const [apiJobs, setApiJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /**
//    * useEffect hook to fetch data from the external API when the component mounts.
//    * The fetched job data is stored in the apiJobs state.
//    */
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios(API_URL);
//       console.log("===================axios=================");
//       console.log(result.data.results);
//       console.log("====================================");
//       setApiJobs(result.data.results);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="jobs-carousel">
//       {loading ? (
//         <div className="text-center Spinner-Media">
//           <img
//             src="https://cdn.dribbble.com/users/924068/screenshots/3757746/media/6035d641a7d26f1ba75421d15ce173cf.gif"
//             alt="Loading spinner"
//           />
//         </div>
//       ) : (
//         <div className="carousel-wrapper">
//           <Carousel
//             enableMouseSwipe={false}
//             easing="cubic-bezier(1,.15,.55,1.54)"
//             tiltEasing="cubic-bezier(0.110, 1, 1.500, 0.210)"
//             transitionMs={1500}
//             breakPoints={breakPoints}
//           >
//             {apiJobs.slice(0, 40).map((job) => (
//               <ExtApiCard job={job} key={job.id} />
//             ))}
//           </Carousel>
//         </div>
//       )}
//       <hr className="separator" />
//     </div>
//   );
// }
