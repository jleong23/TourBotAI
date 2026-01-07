import React from "react";
import { Button } from "../ui/button.jsx";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col mx-5 md:mx-56 gap-9 items-center h-screen">
        <h1 className="font-extrabold text-center text-[20px] md:text-[60px] s:text-[30px] mt-15">
          <span className="text-purple-500">
            Discover Your Next Adventure with A
          </span>
          <br />
          AI Personalised intinary
        </h1>

        <p className="text-xl md:text-2xl text-gray-500 text-center">
          Your AI-Powered trip planner and travel curator, designed to create
          custom itineraries tailored to your interest and budget
        </p>

        <Link to={"/create-trip"}>
          <Button>Get Started. It's Free</Button>
        </Link>

        <img
          src="/landing.png"
          className="-mt-20 shadow-md border-slate-600 rounded-md "
          alt=""
        />
      </div>
    </>
  );
};

export default Hero;
