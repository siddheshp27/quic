import React from "react";
import Navbar from "./Navbar";
import VideoShowcase from "./VideoShowcase";
import VideoPlayer from "./VideoPlayer";

const Home = ({ videos, setVideos }) => {
  return (
    <>
      <Navbar />
      <VideoShowcase videos={videos} setVideos={setVideos} />
    </>
  );
};

export default Home;
