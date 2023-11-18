import React, { useState } from "react";
import Home from "./Components/Home";
import { useAuth0 } from "@auth0/auth0-react";
import VideoPlayer from "./Components/VideoPlayer";
import Upload from "./Components/Upload";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  const ivideos = [
    {
      videoName: "sample1.mp4",
      thumbnail: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      title: "Video 1",
      length: "00:12",
    },
    {
      videoName: "sample2.mp4",
      thumbnail:
        "https://cdn.pixabay.com/photo/2023/10/15/18/12/swan-8317602_1280.jpg",
      title: "Video 2",
      length: "00:12",
    },
    {
      videoName: "sample3.mp4",
      thumbnail:
        "https://cdn.pixabay.com/photo/2023/10/12/14/41/town-8310950_1280.jpg",
      title: "Video 3",
      length: "00:12",
    },
    {
      videoName: "sample4.mp4",
      thumbnail:
        "https://cdn.pixabay.com/photo/2023/09/25/20/11/boat-8275962_1280.jpg",
      title: "Video 4",
      length: "00:12",
    },
  ];

  const { loginWithRedirect } = useAuth0();
  const [videos, setVideos] = useState(ivideos);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home videos={videos} setVideos={setVideos} />}
          ></Route>
          <Route
            path="/upload"
            element={<Upload videos={videos} setVideos={setVideos} />}
          ></Route>
          <Route path="/video/:videoName" element={<VideoPlayer />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
