import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { CiShoppingCart } from "react-icons/ci";
import { PiShoppingCartThin } from 'react-icons/pi';
import { GiGoat } from 'react-icons/gi';
import Logo from './ui/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { UserSlicePath } from '@/redux/slice/user.slice';
import { useAuthContext } from '@/context/AuthContext';
import {
  setCollapse,
  setToggle,
  SidebarSlicePath,
} from '@/redux/slice/sidebar.slice';
import { IoIosMenu } from 'react-icons/io';

const Header = () => {
  const user = useSelector(UserSlicePath);
  const { logoutUser } = useAuthContext();
  const { isToggle, isCollapse } = useSelector(SidebarSlicePath);

  const { pathname } = useLocation();
  const protected_route = [
    '/dashboard',
    '/profile',
    '/AddProduct',
    '/AllProduct',
    '/orders',
    '/wishlist',
    '/checkout',
  ];
  const dispatch = useDispatch();

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex items-center gap-x-2">
            {protected_route.includes(pathname) && (
              <>
                <button
                  className="text-2xl cursor-pointer bg-gray-100 rounded-full p-2 hidden md:block "
                  onClick={() => dispatch(setCollapse())}
                >
                  <IoIosMenu />
                </button>
                <button
                  className="text-2xl cursor-pointer bg-gray-100 rounded-full p-2   block md:hidden"
                  onClick={() => dispatch(setToggle())}
                >
                  <IoIosMenu />
                </button>
              </>
            )}
            <Logo />
          </div>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to={'/'} className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link to={'/about'} className="mr-5 hover:text-gray-900">
              About
            </Link>
            {user ? (
              <>
                <Link to={'/dashboard'} className="mr-5 hover:text-gray-900">
                  Dashboard
                </Link>

                <button
                  onClick={logoutUser}
                  className="mr-5 hover:text-gray-900 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to={'/login'} className="mr-5 hover:text-gray-900">
                Login
              </Link>
            )}
            <Link to="/cart" className="">
              <PiShoppingCartThin className="text-3xl" />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
