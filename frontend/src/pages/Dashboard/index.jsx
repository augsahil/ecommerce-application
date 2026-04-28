import { ROLE_TYPE } from '@/constant/auth.constant';
import { useAuthContext } from '@/context/AuthContext';
import clsx from 'clsx';
import React from 'react';
import { CiShoppingCart, CiHeart, CiBoxes } from 'react-icons/ci';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthContext();

  const data = [
    {
      title: 'Cart',
      Icon: CiShoppingCart,
      value: user?.cart_length || 0,
      for: ROLE_TYPE.BUYER,
      classname: 'bg-purple-500',
      link: '/cart',
    },
    {
      title: 'Wishlist',
      Icon: CiHeart,
      value: user?.wishlist_length || 0,
      for: ROLE_TYPE.BUYER,
      classname: 'bg-red-500',
      link: '/wishlist',
    },
    {
      title: 'Orders',
      Icon: MdOutlineShoppingBag,
      value: user?.orders_length || 0,
      for: ROLE_TYPE.BUYER,
      classname: 'bg-zinc-500',
      link: '/orders',
    },
    {
      title: 'Products',
      Icon: CiBoxes,
      value: user?.products_length || 0,
      for: ROLE_TYPE.SELLER,
      classname: 'bg-blue-500',
      link: '/products',
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 py-10">
        {data
          .filter((cur) => {
            return cur.for == user.role;
          })
          .map((cur, i) => {
            return (
              <Link
                to={cur.link}
                key={i}
                className="w-full bg-white border border-gray-200 px-3 py-2 flex items-center gap-x-2 justify-between rounded hover:shadow"
              >
                <span
                  className={clsx(
                    'text-5xl text-white p-2 rounded-full',
                    cur.classname,
                  )}
                >
                  {' '}
                  <cur.Icon />
                </span>

                <div className="flex flex-col gap-y-2">
                  <p className="text-2xl font-serif font-semibold">
                    {cur.title}
                  </p>
                  <p className="text-end text-4xl font-bold"> {cur.value}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Dashboard;
