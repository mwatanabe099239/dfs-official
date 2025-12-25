import React from "react";

// ResourceCard Component
const ResourceCard = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col gap-2 md:text-start text-center bg-[#181A1E] text-white p-6 rounded-3xl shadow-lg hover:bg-gray-800 transition-all duration-300">
      <div className="flex p-7 md:pl-0 justify-center md:justify-start">
        <img src={icon} alt="resource" className="w-8 h-8"></img>
      </div>
      <h3 className="md:text-2xl text-lg md:font-bold mb-2 ">{title}</h3>
      <p className="hidden md:block text-[14px] text-gray-400">{description}</p>
    </div>
  );
};

export default ResourceCard;
