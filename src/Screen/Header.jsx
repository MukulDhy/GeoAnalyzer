import React from "react";
import { Link } from "react-router-dom";
import logo from "../public/Image/logo.png";

const Header = () => {
  return (
    <nav className="bg-[rgb(42,51,80)] dark:bg-gray-900 w-full z-20 top-0 start-0 shadow-lg border-gray-200 dark:border-gray-600 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={logo}
            className="h-16 bg-white rounded-lg"
            alt="GeoScan Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
            GeoScan
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to="/model">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out -translate-x-4"
            >
              Try Now
            </button>
          </Link>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white text-lg px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
