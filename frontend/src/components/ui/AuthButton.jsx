import React from "react";
import clsx from "clsx";
import { CgSpinner } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa";

const AuthButton = ({ isLoading, text, onClick, className = "" }) => {
  return (
    <button
      type={isLoading ? "button" : "submit"}
      className={clsx(
        `w-full bg-rose-700 cursor-pointer text-white py-2 rounded flex flex-wrap items-center justify-center gap-2 hover:bg-rose-800 transition duration-300 ${className}`,
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      <span>{text}</span>
      {isLoading ? <CgSpinner className="animate-spin" /> : <FaArrowRight />}
    </button>
  );
};

export default AuthButton;
