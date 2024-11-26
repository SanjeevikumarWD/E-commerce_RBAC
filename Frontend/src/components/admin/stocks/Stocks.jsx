import React, { useEffect } from "react";
import Header from "../../header/Header";
import useProductStore from "../../store/ProductStore";
import { useNavigate } from "react-router";

const Stocks = () => {
  const { products, fetchProducts, userRole } = useProductStore();

  const navigate = useNavigate();

  useEffect(() => {
 
    if(userRole === null){
      navigate("/")
    }
    
  }, [userRole]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <Header />
      <div className="mt-20 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Product Stocks</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">ID</th>
                <th className="px-4 py-2 border border-gray-300">Price</th>
                <th className="px-4 py-2 border border-gray-300 text-center">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.product_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">
                      {product.product_name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {product._id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      ${product.product_price}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 flex justify-center">
                      <p
                        className={` text-center max-w-[150px] px-4 py-2 rounded-lg shadow transition bg-green-300 text-green-900 hover:opacity-80`}
                      >
                        IN STOCK
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center px-4 py-2 border border-gray-300"
                  >
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
