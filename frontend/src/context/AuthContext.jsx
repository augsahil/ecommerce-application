import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser, UserSlicePath } from '@/redux/slice/user.slice';
import { toast } from 'react-toastify';
import { axiosClient } from '@/utils/axiosClient';
import LoaderComponent from '@/components/ui/LoaderComponent';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
  user: null,
  fetchUserProfile: () => {},
  logoutUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const user = useSelector(UserSlicePath);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * # Fetch User Profile
   * - if token exist
   * @returns {void}
   */
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) return;
      const response = await axiosClient.get('/auth/profile', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const data = await response.data;
      // console.log(data);
      dispatch(setUser(data));
    } catch (error) {
      toast.error(error?.response?.data?.detail || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  /**
   * # For Logout User
   */
  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch(removeUser());
    toast.success('Logout Success');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderComponent />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ user, logoutUser, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
