import { Routes, Route } from "react-router-dom";
import LoginUser from "@/pages/auth/LoginUser";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={MainLayout}>
          <Route index Component={HomePage} />
        </Route>
        <Route path="/login" Component={LoginUser} />
      </Routes>
    </>
  );
};

export default App;
