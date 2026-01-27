import Logo from "@/components/ui/Logo";

const LoginUser = () => {
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
            <input
              id="password"
              type="password"
              className="w-full p-2 rounded outline-none bg-gray-50 border border-gray-200"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="mt-4">
            <button className="w-full bg-rose-700 text-white py-2 rounded hover:bg-rose-800 transition duration-300">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;
