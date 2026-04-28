import LoaderComponent from '@/components/ui/LoaderComponent';
import { UserSlicePath } from '@/redux/slice/user.slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { setToggle, SidebarSlicePath } from '@/redux/slice/sidebar.slice';
import { CiShoppingCart, CiUser } from 'react-icons/ci';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoBagCheckOutline } from 'react-icons/io5';

import { MdDashboard, MdProductionQuantityLimits } from 'react-icons/md';
import { ROLE_TYPE } from '@/constant/auth.constant';

const ProtectedLayout = () => {
  const user = useSelector(UserSlicePath);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isToggle, isCollapse } = useSelector(SidebarSlicePath);
  useEffect(() => {
    if (!user) {
      navigate('/login');
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
      <div className="flex items-start">
        <Sidebar
          toggled={isToggle}
          collapsed={isCollapse}
          onBackdropClick={() => dispatch(setToggle())}
          breakPoint="md"
        >
          <Menu
            className="h-[80vh] bg-white border-none"
            menuItemStyles={{
              button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                  backgroundColor: '#13395e',
                  color: '#b6c8d9',
                },
              },
            }}
          >
            <MenuItem
              icon={<MdDashboard className="text-2xl" />}
              component={<Link to="/dashboard" />}
            >
              {' '}
              Dashboard
            </MenuItem>

            {user.role == ROLE_TYPE.BUYER ? (
              <>
                {/* buyer */}
                <MenuItem
                  icon={<IoMdHeartEmpty className="text-2xl" />}
                  component={<Link to="/wishlist" />}
                >
                  {' '}
                  WishList
                </MenuItem>
                <MenuItem
                  icon={<IoBagCheckOutline className="text-2xl" />}
                  component={<Link to="/checkout" />}
                >
                  {' '}
                  Checkout
                </MenuItem>
                <MenuItem
                  icon={<CiShoppingCart className="text-2xl" />}
                  component={<Link to="/orders" />}
                >
                  {' '}
                  Orders
                </MenuItem>
              </>
            ) : (
              <>
                {/* seller */}
                <SubMenu
                  label="Products"
                  icon={<MdProductionQuantityLimits className="text-2xl" />}
                >
                  <MenuItem component={<Link to="/AddProduct" />}>
                    {' '}
                    Add Product
                  </MenuItem>
                  <MenuItem component={<Link to="/AllProduct" />}>
                    {' '}
                    All Product
                  </MenuItem>
                </SubMenu>
              </>
            )}

            <MenuItem
              icon={<CiUser className="text-2xl" />}
              component={<Link to="/profile" />}
            >
              {' '}
              Profile
            </MenuItem>
          </Menu>
        </Sidebar>
        <main className="px-4 w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ProtectedLayout;
