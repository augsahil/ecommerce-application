import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { UserSlicePath } from "../redux/slice/user.slice";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const user = useSelector(UserSlicePath);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
