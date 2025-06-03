import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../public/Image/logo.png";

const Header = () => {
  const [isLogin, setIslogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token.length === 0) {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  }, []);

  const handleCheck = () => {
    if (!isLogin) {
      alert("Please First Login");
    }
  };

  return (
    <nav className="bg-[rgb(42,51,80)] dark:bg-gray-900 w-screen-xl z-20 top-0 start-0 shadow-lg border-gray-200 dark:border-gray-600">
      <div className="w-full flex flex-wrap justify-between p-5 ">
        <Link
          to="/"
          className="flex items-center gap-3 rtl:space-x-reverse m-0"
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
          <Link
            to={`${isLogin ? "/model" : "/auth"}`}
            className="text-white m-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm flex text-center px-8 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out"
            onClick={handleCheck}
          >
            {/* <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 m-0 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out "
            > */}
            <span className="text-lg font-semibold whitespace-nowrap text-white dark:text-white">
              Try Now
              {/* GeoScan */}
            </span>
            {/* </button> */}
          </Link>
        </div>
        {!isLogin && (
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link
              to="/auth"
              className="text-white m-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm flex text-center px-8 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out"
            >
              {/* <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 m-0 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out "
            > */}
              <span className="text-lg font-semibold whitespace-nowrap text-white dark:text-white">
                Login
                {/* GeoScan */}
              </span>
              {/* </button> */}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
