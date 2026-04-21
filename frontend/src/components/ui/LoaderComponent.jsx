import React from "react";

const LoaderComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="relative w-32 h-32">
            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#be185d] border-b-[#be185d] animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>

            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#be185d] animate-spin"
              style={{ animationDuration: "2s", animationDirection: "reverse" }}
            ></div>
          </div>

          <div className="absolute inset-0 bg-linear-to-tr from-[#be185d]/10 via-transparent to-[#be185d]/5 animate-pulse rounded-full blur-sm"></div>
        </div>
      </div>
    </>
  );
};

export default LoaderComponent;
