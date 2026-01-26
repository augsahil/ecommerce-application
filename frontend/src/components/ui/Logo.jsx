import React from "react";
import { Link } from "react-router-dom";
import { GiAnimalHide } from "react-icons/gi";

const Logo = ({className}) => {
  return (
    <>
      <Link
        to={"/"}
        className={`flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 ${className}`}
      >
        <GiAnimalHide className="w-10 h-10 text-white p-2 bg-rose-700 rounded-full text-2xl" />
        <span className="ml-3 text-xl">Sahil-Farm</span>
      </Link>
    </>
  );
};

export default Logo;