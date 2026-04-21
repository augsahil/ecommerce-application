import { Routes, Route } from "react-router-dom";
import LoginUser from "@/pages/auth/LoginUser";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import RegisterUser from "@/pages/auth/RegisterUser";
import AuthLayout from "./layout/AuthLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={MainLayout}>
          <Route index Component={HomePage} />
        </Route>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginUser />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterUser />
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
