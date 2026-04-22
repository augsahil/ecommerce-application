import { useState } from "react";

import AuthButton from "@/components/ui/AuthButton";
import Logo from "@/components/ui/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ROLE_TYPE } from "@/constant/auth.constant";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosClient } from "@/utils/axiosClient";
import { setLoading } from "@/redux/slice/user.slice";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";

const LoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const { fetchUserProfile } = useAuthContext();

  const vaidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onSubmitHandler = async (values, helpers) => {
      try {
        setLoading(true);
        console.log(values);
        const response = await axiosClient.post("/auth/login", values);
        const data = response.data;
        // console.log("Response data: ", data);
        toast.success(data.message || "Login successful");
        localStorage.setItem("token", data.token)
        await fetchUserProfile();
        helpers.resetForm();
      } catch (e) {
        // console.log("exception catch is: ", e);
        toast.error(e.response?.data?.detail || e.message || "Login failed");
      }
      finally{
        setIsLoading(false)
      }
    };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <Formik
        validationSchema={vaidationSchema}
        onSubmit={onSubmitHandler}
        initialValues={initialValues}
      >
        <Form className="min-h-screen flex items-center justify-center">
          <div className="w-[96%] mx-auto lg:w-1/2 xl:w-1/3 p-4 lg:px-10 rounded border border-gray-100 shadow flex flex-col gap-4 bg-black/10">
            <div className="md-3 w-full flex justify-center">
              <Logo className={"mx-auto"} />
            </div>
            <div className="md-3 flex flex-col gap-2">
              <label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full p-2 rounded outline-none bg-gray-50 border border-gray-200"
                placeholder="Enter Your Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="md-3 flex flex-col gap-2">
              <label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="w-full p-2 rounded outline-none bg-gray-50 border border-gray-200 flex items-center gap-2">
                <Field
                  id="password"
                  name="password"
                  type={isHide ? "password" : "text"}
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
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mt-4">
              <AuthButton
                text={"Login"}
                isLoading={isLoading}
                // onClick={(e) => handleClick(e)}
              />
            </div>
            <div className="mb-3 flex justify-center items-center">
              <div className="w-full border-t border-gray-200"></div>
              <div className="mx-2 text-gray-500">OR</div>
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="mb-3 flex justify-center items-center">
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                  Register
                </a>
              </p>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default LoginUser;
