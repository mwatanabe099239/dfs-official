import React from 'react';
import { useTheme } from '../context/ThemeContext';

const BuildOnBnb = () => {
  const { isDark } = useTheme();

  return (
    <div className={`font-space px-4 py-16 sm:px-8 md:px-16 lg:px-24 transition-colors duration-300 ${
      isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"
    }`}>
      {/* Container for the section */}
      <div className="bg-[#21f201] p-8 px-8 sm:px-16 rounded-3xl flex flex-col sm:flex-row justify-between items-center sm:items-center space-y-8 sm:space-y-0">

        {/* Left section - Title and Description */}
        <div className='text-start max-w-full sm:max-w-2xl'>
          <h2 className="text-[32px] sm:text-[3rem] leading-[3.5rem] text-[#181A1E] md:my-7 my-3">
            Build on DFS SimuChain
          </h2>
          <p className="sm:text-[1.25rem] text-[1rem] leading-[1.75rem] text-[#181A1E] md:mb-7 mb-3">
            Looking to create your own token or need support with partnerships, grants, or technical assistance? Contact us today!
          </p>
        </div>

        {/* Right section - Buttons */}
        <div className="flex flex-col md:justify-center md:items-center md:mt-[30px] gap-5 sm:gap-4 w-full md:w-auto">
          <button className="bg-[#181A1E] text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300 w-full">
            Contact Us
          </button>
          <button className="bg-transparent border-2 border-[#181A1E] text-[#181A1E] px-6 py-2 rounded-lg w-full hover:bg-[#181A1E] hover:text-white transition duration-300">
            <span className="mr-2">↗</span> Explore Other Apps
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildOnBnb;
