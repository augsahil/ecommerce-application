import React, { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { UserSlicePath } from "@/redux/slice/user.slice";
import { axiosClient } from "@/utils/axiosClient";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const user = useSelector(UserSlicePath);
  const hasRunRef = useRef(false);

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
      console.log("User profile fetched:", data);
    } catch (error) {
      toast.error(error.response?.data?.detail || error.message);
    }
  };

  useEffect(() => {
    // console.log("fetching user profile");
    // fetchUserProfile();
    if (!hasRunRef.current) {
      console.log("fetching user profile");
      fetchUserProfile();
      hasRunRef.current = true;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
