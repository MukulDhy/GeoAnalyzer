import React, { useEffect, useRef } from "react";
import homeVideo from "../public/Video/homevid.mp4";
const HomeVideo = ({ className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className={`${className} relative w-full h-[620px] -z-5 rounded-sm`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        autoPlay
      >
        <source src={homeVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[rgb(27,24,47,0.4)] opacity-65 blur-lg"></div>
    </div>
  );
};

export default HomeVideo;
