import LoaderComponent from '@/components/ui/LoaderComponent';
import { axiosClient } from '@/utils/axiosClient';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axiosClient.get('/orders', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const res = await response.data;
      // console.log(res)
      setOrders(res);
    } catch (error) {
      toast.error(error?.response?.data?.detail || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-54">
        <LoaderComponent />
      </div>
    );
  }

  if (orders.length == 0) {
    return (
      <div className="w-full py-24">
        <h1 className="text-4xl text-center">No Orders Yet</h1>
      </div>
    );
  }

  return (
    <>
      <div className=" w-[98%] lg:w-1/2 xl:w-1/2 mx-auto py-10 flex flex-col gap-y-6">
        {orders &&
          orders.length > 0 &&
          orders.map((cur, i) => {
            return (
              <div
                key={i}
                className="bg-gray-100 rounded-md shadow border border-gray-200 py-4 px-2"
              >
                <div className="flex items-center justify-between">
                  <p>
                    <span
                      className={clsx(
                        'px-3 rounded py-1 uppercase',
                        cur.success
                          ? 'text-white bg-green-900 '
                          : 'text-white bg-red-500',
                      )}
                    >
                      {cur.id}
                    </span>
                  </p>

                  {cur.success && (
                    <p className="flex items-center justify-start gap-x-1">
                      <span className="w-3 h-3 block  bg-yellow-500 rounded-full animate-pulse"></span>{' '}
                      <span className="uppercase">{cur.status}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2 xl:grid-cols-4 py-10">
                  {cur.product.map((cur, i) => {
                    return (
                      <div
                        key={i}
                        className="p-2 bg-white rounded border border-gray-400"
                      >
                        <img
                          src={cur.image}
                          alt={`iamge${i}`}
                          className="w-[100px] object-cover object-top h-[50px]"
                        />
                        <h4 className="font-semibold text-sm">
                          {cur.title.substring(0, 20) + '...'} X{cur.qty}{' '}
                        </h4>
                      </div>
                    );
                  })}
                </div>

                <p className="font-bold text-xl text-end">
                  &#8377; {cur.amount}/-
                </p>

                <p className="text-end">
                  <span className="text-zinc-900 text-sm ">
                    {moment(cur.created_at).format('LLL')}
                  </span>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrdersPage;
