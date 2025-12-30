import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import ResourceCard from "./item/ResourceCard";

const DeveloperResources = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const resources = [
    {
      title: "DFS Scan",
      description: "Searching and Analyzing DFS SimuChain Data",
      icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673517/guwymkq7msbhbxfwmsly.png",
      useBrightness: false,
    },
    {
      title: "Metaface",
      description: "DFS Chain's main wallet. Secure, fast, and easy to use.",
      icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/o2cerargskdqluetq0vs.png",
      useBrightness: false,
    },
    {
      title: "WEXSWAP",
      description: "An exchange similar to a DEX ",
      icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766674347/yw14nsguzbvwonwpfgyx.png",
      useBrightness: false,
    },
    {
      title: "White Creator",
      description: "DRC20 Token Generator",
      icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/lfbyfr2uevv1l0qhswkd.png",
      useBrightness: false,
      iconSize: "w-16 h-16",
    },
    {
      title: "Quick ido",
      description: "Instant Exchanges in Web3 and Web2",
      icon: "/resource/5.png",
      useBrightness: true,
    },
    {
      title: "Moegi Sale",
      description: "Platform for Early-Stage Fundraising",
      icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/ihrgv1ojboawarw7j1km.png",
      useBrightness: false,
    },
    {
      title: "Other apps",
      description: "such as Cefi and AppTool, will be updated as needed",
      icon: "/resource/6.png",
      useBrightness: true,
    },
  ];

  return (
    <div className={`px-4 pt-16 sm:pt-24 md:pt-32 pb-0 sm:px-8 md:px-16 lg:px-24 lg:pt-48 font-space transition-colors duration-300 ${
      isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"
    }`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#21f201]">
          Related <span className={isDark ? "text-white" : "text-gray-900"}>Tools</span>
        </h2>
        <p className={`text-lg mt-4 ${isDark ? "text-[#C4C5CB]" : "text-gray-600"}`}>
          Let us introduce the related tools of DFS SimuChain.
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
            useBrightness={resource.useBrightness}
            iconSize={resource.iconSize}
          />
        ))}
      </div>
    </div>
  );
};

export default DeveloperResources;
