import React from "react";
import "../css/Landing.css";

const Landing = () => {
  return (
    <div className="first-section px-4 sm:pl-8 md:pl-16 lg:pl-20">
      <div className="relative z-10 flex flex-col justify-center text-center space-y-8 pt-32 sm:pt-48 md:pb-72 pb-28 items-start">
        {/* Mainnet Status */}
        <div className="flex items-center space-x-3 text-white bg-[#373943] rounded-[40px] p-2 justify-center sm:justify-start">
          <div className="w-2 h-2 bg-[#53EAA1] rounded-[50%]"></div>
          <div className="text-white text-[14px] leading-[24px] font-medium">
            LAYER 0{" "}
            <span className="text-[14px] leading-[24px] text-[#C4C5CB]">
              {" "}
              IS LIVE
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className=" sm:text-[3rem] text-2xl font-bold text-[#21f201] font-zen">
          DFS Web Chain
        </h1>

        {/* Sub Heading */}
        <p className="text-2xl sm:text-5xl  font-space text-start max-w-3xl text-white">
          Harnessing Cecentralization to Make the Impossible Possible
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:justify-center w-full md:w-[22rem]">
          <button className="bg-[#F7F7F8] font-space text-[#181A1E] py-2 px-6 rounded-lg hover:bg-[#e1d9d9] transition duration-300 w-full  ">
            Issue Coin
          </button>
          <button className="text-slate-300  font-space w-full bg-transparent border-2 border-white py-2 px-6 rounded-lg hover:bg-white hover:text-black transition duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
