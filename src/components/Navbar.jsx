import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#181A1E] text-white py-4 ">
      <div className="flex items-center justify-between md:px-20 px-5">
        {/* BNB CHAIN Logo and Text */}
        <a
          data-theme="dark"
          href="#"
          target="_self"
          className="bg-transparent cursor-pointer"
        >
          <img src="/logo.png" alt="logo" className="md:w-40 w-32"></img>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          {/* <span className="sr-only">Open main menu</span> */}
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Right side buttons */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex space-x-4 md:flex-row ">
            <li>
              <a
                href="#contact"
                className="block  bg-[#181A1E] border-gray-100 border text-gray-100 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100 hover:text-black"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#get-started"
                className=" block bg-[#F7F7F8] text-[#181A1E] text-sm font-medium py-2 px-4 rounded-lg hover:bg-[#e1d9d9]"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
