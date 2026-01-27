import { useState } from "react";

import AuthButton from "@/components/ui/AuthButton";
import Logo from "@/components/ui/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHide, setIsHide] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Login clicked");
    setIsLoading(true);
  };

  return (
    <>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="w-[96%] mx-auto lg:w-1/2 xl:w-1/3 p-4 lg:px-10 rounded border border-gray-100 shadow flex flex-col gap-4">
          <div className="md-3 w-full flex justify-center">
            <Logo className={"mx-auto"} />
          </div>
          <div className="md-3 flex flex-col gap-2">
            <label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 rounded outline-none bg-gray-50 border border-gray-200"
              placeholder="Enter yYour Name"
            />
          </div>
          <div className="md-3 flex flex-col gap-2">
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 rounded outline-none bg-gray-50 border border-gray-200"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="md-3 flex flex-col gap-2">
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="w-full p-2 rounded outline-none bg-gray-50 border border-gray-200 flex items-center gap-2">
              <input
                id="password"
                type="password"
                className="w-full outline-none bg-gray-50"
                placeholder="Enter Your Password"
              />
              <button
                onClick={() => setIsHide(!isHide)}
                type="button"
                className="text-xl"
              >
                {isHide ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <AuthButton
              text={"Login"}
              isLoading={isLoading}
              onClick={(e) => handleClick(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;
