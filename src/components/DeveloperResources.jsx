import React from "react";

import ResourceCard from "./item/ResourceCard"; // Importing ResourceCard component

const DeveloperResources = () => {
  const resources = [
    {
      title: "Dfc Scan",
      description: "Searching and Analyzing DFS Web Chain Data",
      icon: "/resource/1.png",
    },
    {
      title: "Quick ido",
      description: "Instant Exchanges in Web3 and Web2",
      icon: "/resource/2.png",
    },
    {
      title: "White Creator",
      description: "DRC20 Token Generator",
      icon: "/resource/3.png",
    },
    {
      title: "WEX",
      description: "An exchange similar to a DEX ",
      icon: "/resource/4.png",
    },
    {
      title: "Launchpad",
      description: "Platform for Early-Stage Fundraising",
      icon: "/resource/5.png",
    },
    {
      title: "Other apps",
      description: "such as Cefi and AppTool, will be updated as needed",
      icon: "/resource/6.png",
    },
  ];

  return (
    <div className="bg-landing-color  text-white  px-4 pt-32  pb-0 sm:px-8 md:px-16 lg:px-24 lg:pt-48 font-space ">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#21f201]">
          Related <span className="text-white">Tools</span>
        </h2>
        <p className="text-lg mt-4 text-[#C4C5CB]">
          Let us introduce the related tools of DFS Web Chain.
        </p>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:gap-8 gap-2">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            title={resource.title}
            description={resource.description}
            icon={resource.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default DeveloperResources;
