// Native import
import React, { useEffect, useRef } from "react";

// External imports
import lottie from "lottie-web";

// Internal imports
import lottie404 from "../../assets/animation/page404.json";
import "../../styles/notFound.scss";

/**
 * NotFound component renders a user-friendly 404 error page.
 * This component uses a Lottie animation to indicate that the page the user is looking for doesn't exist.
 * The animation is loaded and played using the lottie-web library.
 */
export default function NotFound() {
  // Reference to the container div for the Lottie animation
  const container404 = useRef(null);

  // useEffect hook to load and start the Lottie animation on component mount
  useEffect(() => {
    lottie.loadAnimation({
      container: container404.current, // The HTML element to render the animation in
      renderer: "svg", // Render the animation in SVG format
      loop: true, // Loop the animation
      autoplay: true, // Start playing the animation automatically
      animationData: lottie404, // The animation data to use
    });
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div className="container page404">
      {/* Container div for the Lottie animation */}
      <div className="container404" ref={container404}></div>
    </div>
  );
}
