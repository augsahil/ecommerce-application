import { Routes, Route } from "react-router-dom";
import LoginUser from "@/pages/auth/LoginUser";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import RegisterUser from "@/pages/auth/RegisterUser";
import AuthLayout from "@/layout/AuthLayout";
import Dashboard from "@/pages/Dashboard";
import CartPage from "@/pages/CartPage";
import ProtectedLayout from "@/layout/ProtectedLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={MainLayout}>
          <Route index Component={HomePage} />
          <Route path="/cart" Component={CartPage} />
        </Route>

        <Route Component={ProtectedLayout}>
          <Route path="/dashboard" Component={Dashboard} />
        </Route>

        <Route Component={AuthLayout}>
          <Route path="/login" Component={LoginUser} />
          <Route path="/register" Component={RegisterUser} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
