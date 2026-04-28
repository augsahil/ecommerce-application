import { ROLE_TYPE } from '@/constant/auth.constant';
import { CART_OPERATIONS } from '@/constant/cart.constant';
import { useAuthContext } from '@/context/AuthContext';
import { axiosClient } from '@/utils/axiosClient';
import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartButton = ({ product_id }) => {
  const { user } = useAuthContext();
  const token = localStorage.getItem('token');
  const [qty, setQty] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchExistCart = async () => {
    try {
      const response = await axiosClient.get('/cart/get/' + product_id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await response.data;
      setQty(data.qty);
    } catch (error) {
      toast.error(error?.response?.data?.detail || error.message);
    } finally {
      setLoading(false);
    }
  };
  const addCart = async () => {
    try {
      if (!token) {
        navigate('/login');
        toast.success('Login Required');
        return;
      }

      if (user.role != ROLE_TYPE.BUYER) {
        toast.error('Login With Buyer Account');
        return;
      }

      const response = await axiosClient.post(
        '/cart/add',
        {
          product_id: product_id,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      );
      const data = await response.data;
      toast.success(data.msg);
      await fetchExistCart();
    } catch (e) {
      toast.error(e?.response?.data?.detail || e.message);
    }
  };
  const cartOperation = async (operation = '') => {
    try {
      const response = await axiosClient.put(
        `/cart/product/${product_id}/${operation}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      );

      const data = await response.data;
      toast.success(data.msg);
      await fetchExistCart();
    } catch (e) {
      toast.error(e?.response?.data?.detail || e.message);
    }
  };

  useEffect(() => {
    if (token && user.role == ROLE_TYPE.BUYER) {
      fetchExistCart();
    }
  }, [pathname]);

  return (
    <>
      {parseInt(qty) > 0 ? (
        <>
          <div className=" ml-auto text-white bg-black border-0 focus:outline-none hover:bg-black-600 rounded flex gap-x-3">
            <button
              onClick={() => cartOperation(CART_OPERATIONS.increment)}
              className="px-3 block py-2 bg-blue-500"
            >
              {' '}
              <FaPlus />{' '}
            </button>
            <span className="block py-2 px-4 ">{qty}</span>
            <button
              onClick={() => cartOperation(CART_OPERATIONS.decrement)}
              className="px-3 block py-2 bg-red-500"
            >
              {' '}
              <FaMinus />{' '}
            </button>
            <button
              onClick={() => cartOperation(CART_OPERATIONS.delete)}
              className="px-3 block py-2 bg-red-500"
            >
              {' '}
              <FaTrash />{' '}
            </button>
          </div>
        </>
      ) : (
        <button
          disabled={loading}
          onClick={addCart}
          className="flex ml-auto text-white bg-black  cursor-pointer border-0 py-2 px-6 focus:outline-none hover:bg-black-600 rounded"
        >
          Cart
        </button>
      )}
    </>
  );
};

export default CartButton;
