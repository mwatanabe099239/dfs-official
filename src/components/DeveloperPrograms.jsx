import React from "react";

const DeveloperPrograms = () => {
  return (
    <div className="bg-landing-color text-white px-4 py-16 sm:px-8 md:px-16 lg:px-24 md:pt-44 pt-20">
      <div
        className="h-auto flex flex-col lg:flex-row items-center justify-between border-2 border-[#373943] rounded-[32px] p-8 md:pr-0"
        style={{
          boxShadow:
            "0px 24px 64px 0px rgba(0, 0, 0, 0.48), 0px 4px 0px 0px #21f201",
        }}
      >
        {/* Left Section: Text and Button */}
        <div className="lg:w-1/2 text-start md:pl-14 flex flex-col items-start">
          <h2 className="text-[32px] sm:text-[3rem] font-space leading-[3.5rem] font-bold text-white mb-4">
            Unlock Next-Level Development
          </h2>
          <p className="text-[16px] sm:text-[1.25rem] font-space leading-[1.75rem] text-[#C4C5CB] mb-8">
            Request the apps you need to elevate your project. Enjoy grants,
            incentives, and additional support to bring your ideas to life. Turn
            vision into reality—faster than ever!
          </p>
          <a
            href="#"
            className="inline-block bg-transparent border-2 border-[#21f201] text-white md:w-auto w-full py-2 px-8 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300 text-center"
          >
            Make a Request
          </a>
        </div>

        {/* Right Section: Image */}
        <div
          className="mt-8 lg:mt-0 w-full lg:w-[28rem] "
          style={{
            background:
              "radial-gradient(circle at 1px 1px, #373943 1px, #14151a 1px) 0 0/20px 20px",
          }}
        >
          <img
            src="/rocket.png" // Replace this with the path of your image
            alt="Rocket Image"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperPrograms;
