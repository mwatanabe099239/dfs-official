import React from "react";

interface DappRowProps {
  rank: number;
  name: string;
  categories: string[];
  users: string;
  growth: number;
  link: string;
}

// Individual DApp Row Component
const DappRow: React.FC<DappRowProps> = ({ rank, name, categories, users, growth, link }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center bg-[#181a1e] p-6 rounded-xl text-start font-space space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Rank and Name */}
      <div className="flex items-center space-x-4 w-full sm:w-72">
        <span className="text-[1.25rem] leading-[1.75rem] text-[rgb(140, 143, 155)] font-space font-normal">
          {rank}
        </span>
        <div className="flex flex-col">
          <h3 className="text-[1.25rem] leading-[1.75rem] font-space text-white">
            {name}
          </h3>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm bg-[rgb(196, 197, 203)] text-[#c4c5cb] w-full sm:w-80">
        {/* Categories */}
        {categories.map((category, index) => (
          <span
            key={index}
            className="bg-[#5c5f6a] px-3 py-1 rounded-full font-space "
          >
            {category}
          </span>
        ))}
      </div>

      {/* Users, Growth, and Link */}
      <div className="flex items-center justify-between w-full sm:w-[520px] text-[1.25rem] leading-[1.75rem]">
        <span className="text-white">{users}</span>
        <span className={growth > 0 ? "text-green-500" : "text-red-500"}>
          {growth > 0 ? `+${growth}%` : `${growth}%`}
        </span>
        <div className="md:h-12 h-8 border rounded-[8px] border-[#f7f7f8] md:pt-3 md:w-32 w-20 md:pl-2 pt-1 ">
          <a
            href={link}
            className="flex text-[#f7f7f8] md:text-[1rem] text-[10px] leading-[1.5rem] hover:underline gap-2"
          >
            <span className="pt-1 pl-1">
              <svg
                data-theme="dark"
                viewBox="0 0 24 24"
                focusable="false"
                className="md:w-5 md:h-5 w-4 h-4"
                aria-hidden="true"
              >
                <path
                  d="M16.69 14.5388C16.4706 14.5388 16.2898 14.464 16.1475 14.3144C16.0051 14.1648 15.934 13.9803 15.934 13.761L15.934 9.12666L7.61456 17.4461C7.46431 17.5963 7.28752 17.6714 7.08419 17.6714C6.88085 17.6713 6.70402 17.5962 6.5537 17.4458C6.40337 17.2955 6.32826 17.1188 6.32838 16.9156C6.3285 16.7124 6.40368 16.5357 6.55393 16.3854L14.8733 8.06603L10.2037 8.06601C9.99456 8.06723 9.81854 7.99637 9.67561 7.85344C9.53268 7.71051 9.46122 7.52935 9.46124 7.30997C9.46122 7.09059 9.53238 6.90974 9.67471 6.76741C9.81703 6.62509 9.99788 6.55394 10.2173 6.55394L16.5513 6.55394C16.6837 6.55394 16.8005 6.57735 16.9017 6.62419C17.0029 6.67103 17.0958 6.73676 17.1804 6.82136C17.2651 6.90598 17.3305 6.99859 17.3767 7.0992C17.4229 7.19984 17.4461 7.31633 17.4461 7.44867L17.4461 13.8181C17.4483 14.0116 17.3777 14.1801 17.2343 14.3236C17.0908 14.467 16.9094 14.5388 16.69 14.5388Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            coin link
          </a>
        </div>
      </div>
    </div>
  );
};

export default DappRow;
