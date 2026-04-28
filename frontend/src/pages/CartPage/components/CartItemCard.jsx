import { CART_OPERATIONS } from "@/constant/cart.constant";
import { axiosClient } from "@/utils/axiosClient";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const CartItemCard = ({ data, fetchAllProducts }) => {
  const [loading, setLoading] = useState(false);

  const cartOperation = async (operation = "") => {
    try {
      setLoading(true);

      const response = await axiosClient.put(
        `/cart/product/${data._id}/${operation}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );

      const res = await response.data;
      toast.success(res.msg);
      await fetchAllProducts();
    } catch (e) {
      toast.error(e?.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
        <div className="w-full md:max-w-[126px]">
          <img
            src={data.image}
            alt="perfume bottle image"
            className="mx-auto rounded-xl object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
          <div className="md:col-span-2">
            <div className="flex flex-col max-[500px]:items-center gap-3">
              <h6 className="font-semibold text-base leading-7 text-black">
                {data.title}
              </h6>
              <h6 className="font-normal text-base leading-7 text-gray-500">
                {data.category}
              </h6>
              <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                &#8377; {data.price}
              </h6>
            </div>
          </div>
          <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
            <div className="flex items-center h-full">
              <button
                disabled={loading}
                onClick={() => cartOperation(CART_OPERATIONS.decrement)}
                className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
              >
                <FaMinus />
              </button>
              <input
                type="text"
                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                placeholder={data.qty}
                readOnly
              />
              <button
                disabled={loading}
                onClick={() => cartOperation(CART_OPERATIONS.increment)}
                className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
            <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
              &#8377; {data.total_price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
