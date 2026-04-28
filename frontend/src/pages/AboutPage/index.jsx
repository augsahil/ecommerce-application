import { FaShoppingCart, FaUserTie, FaStore, FaLeaf } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      <section className="max-w-6xl mx-auto py-16 px-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-4">Ecom Farm</h1>
        <p className="text-center text-lg text-gray-600 mb-10">Designed & Developed by <span className="font-semibold text-orange-600">CodeWithKrishna</span></p>

        {/* Farm Stack */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaLeaf /> Farm Stack
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Ecom Farm is built using Farm Stack, providing modern architecture, scalable backend,
            secure authentication, and seamless communication between modules.
          </p>
        </div>

        {/* Role Based System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Buyer */}
          <div className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <FaShoppingCart className="text-orange-600 text-3xl" />
              <h3 className="text-xl font-semibold">Buyer Role</h3>
            </div>
            <p className="text-gray-700">
              Buyers can browse products, compare prices, place orders, and submit product reviews.
              We ensure fast checkout and secure payments.
            </p>
          </div>
          {/* Seller */}
          <div className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <FaStore className="text-orange-600 text-3xl" />
              <h3 className="text-xl font-semibold">Seller Role</h3>
            </div>
            <p className="text-gray-700">
              Sellers can upload products, manage inventory, track orders, and generate reports.
              They have complete analytics access to improve sales.
            </p>
          </div>
        </div>

        {/* Designed with Love */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-12 shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center gap-2">
            <FaUserTie /> About The Developer
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            This platform is designed by <span className="font-semibold">CodeWithKrishna</span> with the
            goal of helping buyers and sellers connect digitally through a scalable E-Commerce system.
          </p>
        </div>
      </section>
    </div>
  );
}
