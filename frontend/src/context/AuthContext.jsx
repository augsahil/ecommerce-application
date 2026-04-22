import React, { createContext, useContext, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, UserSlicePath } from "@/redux/slice/user.slice";
import { axiosClient } from "@/utils/axiosClient";
import { toast } from "react-toastify";
import { setUser } from "@/redux/slice/user.slice";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const user = useSelector(UserSlicePath);
  const hasRunRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) {
        return;
      }
      const response = await axiosClient.get("/auth/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.data;
      // console.log("User profile fetched:", data);
      dispatch(setUser(data));
    } catch (error) {
      toast.error(error.response?.data?.detail || error.message);
    }
  };

  useEffect(() => {
    if (!hasRunRef.current) {
      console.log("fetching user profile");
      fetchUserProfile();
      hasRunRef.current = true;
    }
  }, []);
  
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, logoutUser, fetchUserProfile }}>{children}</AuthContext.Provider>
  );
};
