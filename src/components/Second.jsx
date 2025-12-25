import React from "react";
import { useTheme } from "../context/ThemeContext";

const Second = () => {
  const { isDark } = useTheme();

  return (
    <div className={`px-4 py-16 sm:px-8 md:px-16 lg:px-24 transition-colors duration-300 ${
      isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"
    }`}>
      {/* Title */}
      <div className="text-center mb-12 flex flex-col sm:flex-row justify-between items-center">
        <h2 className={`font-bold text-start text-3xl sm:text-5xl max-w-xl font-space leading-[3.5rem] mb-4 sm:mb-0 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          A <span className="text-[#21f201]">Blockchain</span> with Daily Active
          User Updates
        </h2>
        <p className={`text-[1.25rem] font-space mt-4 sm:mt-0 text-start max-w-[25rem] ${
          isDark ? "text-[#C4C5CB]" : "text-gray-600"
        }`}>
          As of January 2026, SimuChain is a blockchain designed to support CeFi, AI agencies, enterprise systems, digital verification, and transaction-intensive services.
        </p>
      </div>

      <div className={`border-b border-solid w-full mb-6 ${isDark ? "border-[#373943]" : "border-gray-200"}`}></div>

      {/* Stat Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-12">
        {/* Stat 1 */}
        <div className={`flex md:flex-col gap-10 md:gap-0 flex-row-reverse justify-end items-start text-center md:p-6 pt-8 shadow-xl w-full sm:w-1/3 md:border-r md:max-lg:border-b border-solid ${
          isDark ? "border-[#373943]" : "border-gray-200"
        }`}>
          <div className="flex justify-center mb-4 flex-col items-start">
            <div className={`md:text-[4rem] font-zen font-bold md:leading-[4.5rem] text-4xl mb-4 ${
              isDark ? "text-[rgba(255,255,255,0.24)]" : "text-gray-300"
            }`}>
              100K<span className="text-[#21f201]">+</span>
            </div>
            <span className={`text-[1.25rem] leading-[1.75rem] font-space mb-12 ${
              isDark ? "text-[#C4C5CB]" : "text-gray-600"
            }`}>
              Active Users
            </span>
          </div>

          <a
            data-theme={isDark ? "dark" : "light"}
            href="https://bscscan.com/chart/address"
            target="_blank"
            rel="noreferrer noopener"
            className={`flex md:pl-2 md:h-11 md:w-11 rounded-full md:pt-1.5 h-16 w-16 pl-3 pt-[10px] ${
              isDark ? "bg-[#1E2026] text-[#8C8F9B]" : "bg-gray-100 text-gray-500"
            }`}
          >
            <svg
              data-theme={isDark ? "dark" : "light"}
              viewBox="0 0 24 24"
              focusable="false"
              className="md:w-7 md:h-7 w-10 h-10"
            >
              <path
                d="M4.61979 14.0818L6.75054 11.951L4.61979 9.82029L2.48904 11.951L4.61979 14.0818ZM17.9659 13.6722L20.1005 10.2491L22.2447 13.6722H17.9659ZM12.3539 12.8452C11.6337 12.8452 11.0204 12.5928 10.514 12.088C10.0076 11.5832 9.75441 10.9703 9.75441 10.2491C9.75441 9.51355 10.0068 8.89697 10.5116 8.39939C11.0164 7.90181 11.6294 7.65302 12.3505 7.65302C13.0861 7.65302 13.7027 7.90148 14.2003 8.39841C14.6979 8.89535 14.9467 9.51112 14.9467 10.2457C14.9467 10.9659 14.6982 11.5792 14.2013 12.0856C13.7043 12.592 13.0885 12.8452 12.3539 12.8452ZM12.3505 9.15296C12.048 9.15296 11.7896 9.25802 11.5755 9.46812C11.3614 9.67822 11.2544 9.93855 11.2544 10.2491C11.2544 10.5517 11.3614 10.81 11.5755 11.0241C11.7896 11.2382 12.0496 11.3453 12.3553 11.3453C12.6611 11.3453 12.9195 11.2382 13.1304 11.0241C13.3412 10.81 13.4467 10.5501 13.4467 10.2443C13.4467 9.93855 13.3416 9.68021 13.1316 9.46931C12.9215 9.25841 12.6611 9.15296 12.3505 9.15296ZM0.850586 18.1337V16.9145C0.850586 16.2388 1.19915 15.6898 1.89629 15.2673C2.59344 14.8449 3.49815 14.6337 4.61044 14.6337C4.8141 14.6337 5.00953 14.6395 5.19671 14.651C5.38389 14.6625 5.56274 14.685 5.73324 14.7183C5.54479 15.0132 5.40184 15.327 5.30441 15.6597C5.20698 15.9925 5.15826 16.3469 5.15826 16.7231V18.1337H0.850586ZM6.85056 18.1337V16.7587C6.85056 15.8036 7.35879 15.0375 8.37526 14.4606C9.39171 13.8837 10.7177 13.5952 12.3532 13.5952C14.004 13.5952 15.3329 13.8837 16.3399 14.4606C17.347 15.0375 17.8505 15.8036 17.8505 16.7587V18.1337H6.85056ZM20.1005 14.6337C21.2255 14.6337 22.1318 14.8449 22.8193 15.2673C23.5068 15.6898 23.8505 16.2388 23.8505 16.9145V18.1337H19.5428V16.7231C19.5428 16.3469 19.4983 15.9925 19.4092 15.6597C19.3201 15.327 19.1864 15.0132 19.0082 14.7183C19.1787 14.685 19.3556 14.6625 19.5388 14.651C19.7221 14.6395 19.9093 14.6337 20.1005 14.6337ZM12.3494 15.0952C11.3104 15.0952 10.4175 15.233 9.67071 15.5087C8.92393 15.7843 8.50951 16.1241 8.42746 16.5279V16.6337H16.289V16.5279C16.1967 16.1241 15.7813 15.7843 15.0429 15.5087C14.3044 15.233 13.4066 15.0952 12.3494 15.0952Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>

        {/* Stat 2 */}
        <div className={`flex md:flex-col gap-10 md:gap-0 flex-row-reverse justify-end items-start text-center md:p-6 pt-8 shadow-xl w-full sm:w-1/3 md:border-r md:max-lg:border-b border-solid ${
          isDark ? "border-[#373943]" : "border-gray-200"
        }`}>
          <div className="flex justify-center mb-4 flex-col items-start">
            <div className={`md:text-[4rem] font-zen font-bold md:leading-[4.5rem] text-4xl mb-4 ${
              isDark ? "text-[rgba(255,255,255,0.24)]" : "text-gray-300"
            }`}>
              100<span className="text-[#21f201]">+</span>
            </div>
            <span className={`text-[1.25rem] leading-[1.75rem] font-space mb-12 ${
              isDark ? "text-[#C4C5CB]" : "text-gray-600"
            }`}>
              Active dApps
            </span>
          </div>

          <a
            data-theme={isDark ? "dark" : "light"}
            href="https://bscscan.com/chart/address"
            target="_blank"
            rel="noreferrer noopener"
            className={`flex md:pl-2 md:h-11 md:w-11 rounded-full md:pt-1.5 h-16 w-16 pl-3 pt-[10px] ${
              isDark ? "bg-[#1E2026] text-[#8C8F9B]" : "bg-gray-100 text-gray-500"
            }`}
          >
            <svg
              data-theme={isDark ? "dark" : "light"}
              viewBox="0 0 24 24"
              focusable="false"
              className="md:w-7 md:h-7 w-10 h-10"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.455 3.70711C16.8455 3.31658 17.4787 3.31658 17.8692 3.70711L21.2929 7.13077C21.6834 7.52129 21.6834 8.15446 21.2929 8.54498L17.8692 11.9686C17.4787 12.3592 16.8455 12.3592 16.455 11.9686L13.0313 8.54498C12.6408 8.15446 12.6408 7.52129 13.0313 7.13077L16.455 3.70711ZM14.2334 7.83787L17.1621 4.90919L20.0908 7.83787L17.1621 10.7666L14.2334 7.83787Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5.18916C4 4.63688 4.44772 4.18916 5 4.18916H10.135C10.6873 4.18916 11.135 4.63688 11.135 5.18916V10.3241C11.135 10.8764 10.6873 11.3241 10.135 11.3241H5C4.44772 11.3241 4 10.8764 4 10.3241V5.18916ZM5.35 9.97413V5.53916H9.78497V9.97413H5.35Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 14.7025C4 14.1502 4.44772 13.7025 5 13.7025H10.135C10.6873 13.7025 11.135 14.1502 11.135 14.7025V19.8374C11.135 20.3897 10.6873 20.8374 10.135 20.8374H5C4.44772 20.8374 4 20.3897 4 19.8374V14.7025ZM5.35 19.4874V15.0525H9.78497V19.4874H5.35Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.6759 13.865C14.1236 13.865 13.6759 14.3127 13.6759 14.865V20C13.6759 20.5523 14.1236 21 14.6759 21H19.8109C20.3632 21 20.8109 20.5523 20.8109 20V14.865C20.8109 14.3127 20.3632 13.865 19.8109 13.865H14.6759ZM15.0259 15.215V19.65H19.4609V15.215H15.0259Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>

        {/* Stat 3 */}
        <div className={`flex md:flex-col gap-10 md:gap-0 flex-row-reverse justify-end items-start text-center md:p-6 pt-8 shadow-xl w-full sm:w-1/3 md:max-lg:border-b border-solid ${
          isDark ? "border-[#373943]" : "border-gray-200"
        }`}>
          <div className="flex justify-center mb-4 flex-col items-start">
            <div className={`md:text-[4rem] font-zen font-bold md:leading-[4.5rem] text-4xl mb-4 ${
              isDark ? "text-[rgba(255,255,255,0.24)]" : "text-gray-300"
            }`}>
              100K<span className="text-[#21f201]">+</span>
            </div>
            <span className={`text-[1.25rem] leading-[1.75rem] font-space mb-12 ${
              isDark ? "text-[#C4C5CB]" : "text-gray-600"
            }`}>
              Generated token
            </span>
          </div>

          <a
            data-theme={isDark ? "dark" : "light"}
            href="https://bscscan.com/chart/address"
            target="_blank"
            rel="noreferrer noopener"
            className={`flex md:pl-2 md:h-11 md:w-11 rounded-full md:pt-[8px] h-16 w-16 pl-3 pt-[10px] ${
              isDark ? "bg-[#1E2026] text-[#8C8F9B]" : "bg-gray-100 text-gray-500"
            }`}
          >
            <img
              src="/100k.png"
              alt="logo"
              className={`md:w-6 md:h-6 w-10 h-10 ${!isDark ? "opacity-60" : ""}`}
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Second;
