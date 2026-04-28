import React, { useState } from 'react';
import Logo from '@/components/ui/Logo';
import AuthButton from '@/components/ui/AuthButton';
import { FaEye, FaEyeSlash, FaSlack, FaSlash } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE_TYPE } from '@/constant/auth.constant';
import { axiosClient } from '@/utils/axiosClient';
import { toast } from 'react-toastify';
import { useAuthContext } from '@/context/AuthContext';
const RegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const navigate = useNavigate();
  const { fetchUserProfile } = useAuthContext();

  const validationSchema = yup.object({
    name: yup.string().required('Name is Required'),
    email: yup
      .string()
      .required('Email is Required')
      .email('EMail must be a proper email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be grater than 6 characters'),
    role: yup
      .string()
      .required('Role is Required')
      .oneOf(Object.values(ROLE_TYPE), 'Choose Valid Role'),
  });

  const onSubmitHandler = async (values, helpers) => {
    try {
      setIsLoading(true);
      const response = await axiosClient.post('/auth/register', values);
      const data = response.data;

      // console.log(data)
      toast.success(data.msg);
      localStorage.setItem('token', data.token);
      await fetchUserProfile();

      helpers.resetForm();
      navigate('/dashboard');
    } catch (e) {
      // console.log(e)
      toast.error(e.response.data.detail || e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: ROLE_TYPE.BUYER,
  };
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        initialValues={initialValues}
      >
        <Form className="min-h-screen  flex items-center justify-center">
          <div className="w-[96%] mx-auto lg:1/2 xl:w-1/3 p-4 lg:px-10 rounded border border-gray-100 shadow">
            <div className="mb-3 w-full flex justify-center">
              <Logo className={'mx-auto block'} />
            </div>
            <div className="mb-3">
              <label htmlFor="name">
                Name <span className="text-red-500">*</span>{' '}
              </label>
              <Field
                name="name"
                id="name"
                type="text"
                className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200"
                placeholder="Enter Your Name"
              />
              <ErrorMessage
                name="name"
                className="text-red-500"
                component={'p'}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-red-500">*</span>{' '}
              </label>
              <Field
                name="email"
                id="email"
                type="email"
                className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200"
                placeholder="Enter Your Email"
              />
              <ErrorMessage
                name="email"
                className="text-red-500"
                component={'p'}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                Password <span className="text-red-500">*</span>{' '}
              </label>
              <div className="w-full  px-2 rounded outline-none bg-gray-50 border border-gray-200 flex justify-between items-center">
                <Field
                  name="password"
                  id="password"
                  className="w-full py-2 outline-none "
                  type={isHide ? 'password' : 'text'}
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
                className="text-red-500"
                component={'p'}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Role">
                Role <span className="text-red-500">*</span>{' '}
              </label>
              <Field
                as="select"
                name="role"
                id="role"
                className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200"
              >
                {Object.values(ROLE_TYPE).map((cur, i) => {
                  return (
                    <option key={i} value={cur} className="capitalize">
                      {cur}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage
                name="role"
                className="text-red-500"
                component={'p'}
              />
            </div>
            <div className="mb-3">
              <AuthButton isLoading={isLoading} text={'Register'} />
            </div>

            <div className="mb-3 flex justify-center items-center gap-x-6">
              <div className="w-full h-[0.1000px] bg-gray-400"></div>
              <div className="">OR</div>
              <div className="w-full h-[0.1000px] bg-gray-400"></div>
            </div>

            <div className="mb-3 text-center">
              <p>
                Already Have An Account ?{' '}
                <Link to={'/login'} className="text-red-600">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterUser;
