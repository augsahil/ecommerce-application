import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuthContext } from '@/context/AuthContext';
import { ROLE_TYPE } from '@/constant/auth.constant';
import AuthButton from '@/components/ui/AuthButton';
import { toast } from 'react-toastify';
import { axiosClient } from '@/utils/axiosClient';
const BasicDetails = () => {
  const { user, fetchUserProfile } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const validationSchema = yup.object({
    name: yup.string().required('Name is Required'),
    email: yup.string(),
    role: yup.string(),
  });

  const onSubmitHandler = async (values, _) => {
    try {
      setLoading(true);
      const response = await axiosClient.put(
        '/auth/update-basic-details',
        values,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      );
      const data = await response.data;
      toast.success(data.msg);
      // console.log(values)
      await fetchUserProfile();
    } catch (error) {
      toast.error(error?.response?.data?.detail || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInitialValues({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }, [user]);

  return (
    <>
      <h2 className="text-xl font-bold">Basic Details : </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="name">
              Name <span className="text-red-500">*</span>{' '}
            </label>
            <Field
              type="text"
              placeholder="Enter Your Name"
              id="name"
              name="name"
              className="w-full py-2 px-3 rounded bg-gray-50 border border-gray-200 outline-none"
            />
            <ErrorMessage
              component={'p'}
              className="text-red-500"
              name="name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              EMail <span className="text-red-500">*</span>{' '}
            </label>
            <input
              value={initialValues.email}
              readOnly
              type="email"
              placeholder="Enter Your EMail"
              id="email"
              name="email"
              className="w-full py-2 px-3 rounded bg-gray-50 border border-gray-200 outline-none"
            />
            <ErrorMessage
              component={'p'}
              className="text-red-500"
              name="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role">
              Role <span className="text-red-500">*</span>{' '}
            </label>
            <select
              value={initialValues.role}
              readOnly
              type="text"
              id="role"
              name="role"
              className="w-full py-2 px-3 rounded bg-gray-50 border border-gray-200 outline-none"
            >
              {Object.values(ROLE_TYPE).map((cur, i) => {
                return (
                  <option
                    key={i}
                    defaultChecked={cur == initialValues.role}
                    value={cur}
                  >
                    {cur}
                  </option>
                );
              })}
            </select>
            <ErrorMessage
              component={'p'}
              className="text-red-500"
              name="role"
            />
          </div>

          <div className="mb-3">
            <AuthButton className={''} text={'Update'} isLoading={loading} />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default BasicDetails;
