import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import img from "../public/video.png";

const Upload = ({ videos, setVideos }) => {
  const [base64String, setBase64String] = useState("");
  const [name, setName] = useState("");
  const handleFileInputChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        console.log(base64, file.name);
        setName(file.name);
        setBase64String(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(base64String);
    const res = await axios.post("http://localhost:3001/video", {
      base: base64String,
      name,
    });
    setVideos((prev) => {
      prev.push({
        videoName: name,
        thumbnail: img,
        title: `Video ${prev.length + 1}`,
        length: "00:12",
      });
      return prev;
    });
    console.log(videos);
    // console.log(res);
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="text mb-[15%]">
        <h1 className="text-center pt-16 text-4xl font-bold tracking-tight leading-none text-white md:text-5xl lg:text-4xl dark:text-white text-up ">
          Upload Your Videos
        </h1>
      </div>

      <div className="flex items-center justify-center ">
        <form
          onSubmit={handleSubmit}
          className="w-8/12 flex items-center justify-center flex-col"
        >
          <input
            type="file"
            id="inp"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            onChange={handleFileInputChange}
          />
          <button className="m-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-3.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
