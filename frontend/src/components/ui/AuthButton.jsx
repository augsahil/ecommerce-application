import clsx from "clsx";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { IoIosArrowRoundForward } from "react-icons/io";

const AuthButton = ({ isLoading = false, text, className }) => {
  return (
    <button
      disabled={isLoading}
      type={isLoading ? "button" : "submit"}
      className={clsx(
        "w-full py-2 bg-black text-white rounded outline-none cursor-pointer disabled:cursor-no-drop flex items-center justify-center gap-x-1",
        className,
        "disabled:bg-gray-800",
      )}
    >
      <span>{text}</span>{" "}
      {isLoading ? (
        <CgSpinner className="animate-spin text-xl" />
      ) : (
        <IoIosArrowRoundForward className="text-xl" />
      )}{" "}
    </button>
  );
};

export default AuthButton;
