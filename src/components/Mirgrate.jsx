import React from "react";

const Migrate = () => {
  return (
    <div className="bg-landing-color text-white px-4 md:pb-3 pb-3 sm:px-8 md:px-16 lg:px-24 pt-44">
      <div
        className="h-auto flex flex-col lg:flex-row items-center justify-between border-2 border-[#373943] rounded-[32px] p-8 "
        style={{
          boxShadow:
            "0px 24px 64px 0px rgba(0, 0, 0, 0.48), 0px 4px 0px 0px #21f201",
        }}
      >
        {/* Right Section: Image */}
        <div
          className="mt-8 lg:mt-0 w-full lg:w-[27rem] pr-8 pl-10"
          style={{
            background:
              "radial-gradient(circle at 1px 1px, #373943 1px, #14151a 1px) 0 0/20px 20px",
          }}
        >
          <img
            src="/mig.png" // Replace this with the path of your image
            alt="Rocket Image"
            className="w-full h-auto max-w-[24rem] max-h-[24rem]"
          />
        </div>

        {/* Left Section: Text and Button */}
        <div className="lg:w-1/2 text-start pl-0 lg:pl-24 mt-8 lg:mt-0">
          <h2 className="text-[2.5rem] sm:text-[3rem] font-space leading-[3.5rem] font-bold text-white mb-4">
            Migration from Web3 to DFS Web Chain
          </h2>
          <p className="text-[1.125rem] sm:text-[1.25rem] font-space leading-[1.75rem] text-[#C4C5CB] mb-8">
            DFS Web Chain aims to provide support and assistance to projects
            seeking to migrate from Web3 blockchains.
          </p>
          <a
            href="#"
            className="w-full sm:w-auto text-center inline-block bg-transparent border-2 border-[#21f201] text-white py-2 px-8 rounded-lg hover:bg-[#21f201] hover:text-black transition duration-300"
          >
            See Instructions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Migrate;
