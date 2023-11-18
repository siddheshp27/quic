import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function VideoPlayer() {
  const videoRef = useRef(null);
  const { videoName } = useParams();
  const [videoURL, setVideoURL] = useState(null);
  const [loading, setLoading] = useState(true); // initial loading state

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await axios.get(
          `http://localhost:3001/video/${videoName}`,
          { responseType: "arraybuffer" }
        );
        const videoBlob = new Blob([response.data], { type: "video/mp4" });
        setVideoURL(URL.createObjectURL(videoBlob));
        setLoading(false); // set loading to false once video data is fetched
      } catch (error) {
        console.error("Error fetching video data:", error);
        setLoading(false); // set loading to false even on error for now
      }
    }
    fetchVideo();
  }, [videoName]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        {loading ? (
          <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        ) : (
          <video
            ref={videoRef}
            controls
            className="w-3/4 h-3/4 max-w-screen-md max-h-screen-md"
            src={videoURL}
          ></video>
        )}
      </div>
    </>
  );
}

export default VideoPlayer;
