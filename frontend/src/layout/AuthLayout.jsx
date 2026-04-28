import LoaderComponent from '@/components/ui/LoaderComponent';
import { UserSlicePath } from '@/redux/slice/user.slice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const user = useSelector(UserSlicePath);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
