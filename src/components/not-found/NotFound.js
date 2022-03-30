//native import
import React, { useEffect, useRef } from "react";

// external imports
import lottie from "lottie-web";

//internal imports
import lottie404 from "../../assets/animation/page404.json";
import '../../styles/notFound.scss';

export default function NotFound() {
  const container404 = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container404.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: lottie404,
    });
  }, []);

  return (
    <div className="container page404">
      <div className="container404" ref={container404}></div>;
    </div>
  );
}
