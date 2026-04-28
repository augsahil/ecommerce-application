import React, { useEffect, useState } from 'react';
import CartItemCard from './components/CartItemCard';
import LoaderComponent from '@/components/ui/LoaderComponent';
import { toast } from 'react-toastify';
import { axiosClient } from '@/utils/axiosClient';
import { useAuthContext } from '@/context/AuthContext';
import CartEmpty from '@/assets/cart_empty.png';
import { Link } from 'react-router-dom';
const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  // const [products,setProducs] = useState([])
  const [cartData, setCartData] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await axiosClient.get('/cart/get', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await response.data;

      setCartData(data);
    } catch (error) {
      toast.error(error?.response?.data?.detail || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-56 ">
        <LoaderComponent />
      </div>
    );
  }

  if (!user || (cartData && cartData.products.length <= 0)) {
    return (
      <div className="text-3xl flex-col py-10 items-center justify-center">
        <img src={CartEmpty} alt="Empty Cart" className="w-40 mx-auto" />
        <h4 className="text-center font-semibold text-4xl">No Item In Cart</h4>
        <div className="flex items-center justify-center pt-4">
          <Link
            to={'/'}
            className="px-3 mx-auto bg-black text-white rounded  py-1 inline-block text-lg"
          >
            Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12 py-10">
            <div className="col-span-12 xl:col-span-8 lg:pr-8  pb-8  w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Shopping Cart
                </h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                  {cartData?.products?.length} Items
                </h2>
              </div>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {cartData.products &&
                cartData.products.length > 0 &&
                cartData.products.map((cur, i) => {
                  return (
                    <CartItemCard
                      key={i}
                      fetchAllProducts={fetchAllProducts}
                      data={cur}
                    />
                  );
                })}
            </div>
            <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 ">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
              </h2>
              <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                  <p className="font-normal text-lg leading-8 text-black">
                    {cartData?.products?.length} Items
                  </p>
                  <p className="font-medium text-lg leading-8 text-black">
                    &#8377; {cartData?.total}
                  </p>
                </div>
                <Link
                  to={'/checkout'}
                  className="rounded-lg block bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80 w-full"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
