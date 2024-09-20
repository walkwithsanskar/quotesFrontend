// src/components/ImageOne.jsx
import React from "react";
import { Parallax } from "react-parallax";
import { useNavigate } from "react-router-dom";
import pp2 from "../images/pp2.jpg";

const ImageThree = () => {
  const navigate = useNavigate();

  return (
    <Parallax bgImage={pp2} strength={800} className="relative h-[100vh]">
      <div className="flex items-center justify-center mt-80 h-full w-full">
        <span className="uppercase p-4 text-lg space-x-5 bg-slate-400 rounded-3xl px-6 py-3 text-black text-center">
          Quotes likho
        </span>
      </div>
      <div className="text-white flex justify-center items-center space-x-7 p-3">
        <button
          className="bg-gray-500 rounded-3xl p-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-gray-500 rounded-3xl p-2"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </Parallax>
  );
};

export default ImageThree;
