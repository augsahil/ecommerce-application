import LoaderComponent from '@/components/ui/LoaderComponent';
import { ROLE_TYPE } from '@/constant/auth.constant';
import { UserSlicePath } from '@/redux/slice/user.slice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const RoleLayout = ({ role }) => {
  const user = useSelector(UserSlicePath);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role != role) {
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

export default RoleLayout;
