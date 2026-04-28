import LoaderComponent from '@/components/ui/LoaderComponent';
import { axiosClient } from '@/utils/axiosClient';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EmptyImage from '@/assets/empty.png';
import { Link } from 'react-router-dom';
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);

      const response = await axiosClient.get('/products');
      const data = await response.data;
      setProducts(data);
    } catch (error) {
      toast.error(error.response.data.detai || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-56 flex items-center justify-center">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <>
      <section className="text-gray-600 body-font mx-auto">
        <div className="container px-5 py-10 mx-auto">
          <div className="grid  grid-cols-1 md:grid-cols-2  gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {products.length > 0 ? (
              products.map((cur, i) => {
                return <Card key={i} data={cur} />;
              })
            ) : (
              <>
                <img
                  src={EmptyImage}
                  alt="Empty Image"
                  className="mx-auto block col-span-4 w-1/4"
                />
                <h4 className="text-3xl text-center col-span-4 font-bold">
                  Shop Empty
                </h4>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

const Card = ({ data }) => {
  return (
    <>
      <Link
        to={'/product/' + data.slug}
        className="  w-full bg-gray-50 border border-gray-200"
      >
        <a className="block relative h-48 rounded overflow-hidden">
          <img
            alt={data.title}
            className="object-cover object-top w-full h-full block"
            src={data.image}
          />
        </a>
        <div className="  p-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {data.category}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {data.title}
          </h2>
          <p className="mt-1">&#8377; {data.price}</p>
        </div>
      </Link>
    </>
  );
};
