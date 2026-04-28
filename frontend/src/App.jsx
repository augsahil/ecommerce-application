import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginUser from '@/pages/auth/LoginUser';
import MainLayout from '@/layout/MainLayout';
import RegisterUser from './pages/auth/RegisterUser';
import AuthLayout from './layout/AuthLayout';
import Dashboard from './pages/Dashboard';
import CartPage from './pages/CartPage';
import ProtectedLayout from './layout/ProtectedLayout';
import ProfileUser from './pages/auth/ProfileUser';
import AddProduct from './pages/Products/AddProduct';
import AllProducts from './pages/Products/AllProducts';
import RoleLayout from './layout/RoleLayout';
import { ROLE_TYPE } from './constant/auth.constant';
import OrdersPage from './pages/Orders';
import ProductPage from './pages/ProductPage';
import WishListPage from './pages/WishListPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/CheckoutPage/SuccessPage';
import FailedPage from './pages/CheckoutPage/FailedPage';
import AboutPage from './pages/AboutPage';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={MainLayout}>
          <Route index Component={HomePage} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/product/:slug" Component={ProductPage} />
          <Route path="/about" Component={AboutPage} />

          <Route Component={ProtectedLayout}>
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/profile" Component={ProfileUser} />

            {/* Buyer routes */}
            <Route element={<RoleLayout role={ROLE_TYPE.BUYER} />}>
              <Route path="/orders" Component={OrdersPage} />
              <Route path="/wishlist" Component={WishListPage} />
              <Route path="/checkout" Component={CheckoutPage} />
              <Route path="/checkout/success" Component={SuccessPage} />
              <Route path="/checkout/failed" Component={FailedPage} />
            </Route>

            {/* Seller routes */}
            <Route element={<RoleLayout role={ROLE_TYPE.SELLER} />}>
              <Route path="/AddProduct" Component={AddProduct} />
              <Route path="/AllProduct" Component={AllProducts} />
            </Route>
          </Route>
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
