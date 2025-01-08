import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import useProductStore from "../../store/ProductStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const Stocks = () => {
  const CloudinaryKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const CloudinaryName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CloudinaryScretKey = import.meta.env.VITE_CLOUDINARY_API_SECRET;
  const api_url = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const { products, fetchProducts, userRole } = useProductStore();
  const [popUpVisibility, setPopUpVisibility] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: null,
    productDiscount: null,
    productImage: null,
    productDescription: "",
    sex: "men", // Default value
    bestSeller: false,
    featured: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === null) {
      navigate("/");
    }
  }, [userRole]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductAdd = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !productData.productName ||
      !productData.productPrice ||
      !productData.productImage ||
      !productData.productDescription
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      // Upload the image and get the URL
      const imageUrl = await uploadImage(productData.productImage);

      // Use the uploaded image URL in the product data
      const newProductData = {
        ...productData,
        productImage: imageUrl,
      };

      // Make the API call to add the product
      const response = await axios.post(
        `${api_url}/api/staffs/addProduct`,
        newProductData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        alert("Product added successfully!");
        fetchProducts(); // Refresh the products list
        setPopUpVisibility(false); // Close the popup
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  // Separate function to handle image upload
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "snev_ecommerce");
    data.append("cloud_name", CloudinaryName);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CloudinaryName}/image/upload`,
        data
      );
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      throw error;
    }
  };

  const handleDelete = async (productId) => {
    const response = await axios.delete(
      `${api_url}/api/staffs/deleteProduct/${productId}`
    );
    if (response.status === 200) {
      alert("Product deleted successfully!");
      fetchProducts(); // Refresh the products list
    } else {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="mt-20">
      <Header />
      {popUpVisibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex items-center justify-between py-4">
              <h2 className="text-xl font-bold">Add Product</h2>
              <button
                className="text-xl font-bold text-gray-500"
                onClick={() => setPopUpVisibility(false)}
              >
                <RxCross1 />
              </button>
            </div>
            <form onSubmit={handleProductAdd}>
              <input
                type="file"
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productImage: e.target.files[0],
                  })
                }
                className="block w-full mb-3"
              />
              <input
                type="text"
                placeholder="Product Name"
                value={productData.productName}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productName: e.target.value,
                  })
                }
                className="block w-full mb-3"
              />
              <input
                type="number"
                placeholder="Product Price"
                value={productData.productPrice}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productPrice: e.target.value,
                  })
                }
                className="block w-full mb-3"
              />
              <input
                type="number"
                placeholder="Product Discount"
                value={productData.productDiscount}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productDiscount: e.target.value,
                  })
                }
                className="block w-full mb-3"
              />
              <textarea
                placeholder="Description"
                value={productData.productDescription}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productDescription: e.target.value,
                  })
                }
                className="block w-full mb-3"
              />
              <select
                value={productData.sex}
                onChange={(e) =>
                  setProductData({ ...productData, sex: e.target.value })
                }
                className="block w-full mb-3"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={productData.bestSeller}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      bestSeller: e.target.checked,
                    })
                  }
                />{" "}
                Best Seller
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={productData.featured}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      featured: e.target.checked,
                    })
                  }
                />{" "}
                Featured
              </label>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-white font-semibold w-full"
              >
                {loading ? "Saving..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="my-10 container mx-auto px-4 max-w-[1000px]">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-6">Product Stocks</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-white font-semibold"
            onClick={() => setPopUpVisibility(true)}
          >
            Add Product
          </button>
        </div>
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
                    <td className="px-4 py-2 border border-gray-300 ">
                      <div className="flex  justify-around items-center cursor-pointer">
                        <FiEdit2 />
                        <MdOutlineDelete
                          className="text-xl"
                          onClick={() => handleDelete(product._id)}
                        />
                      </div>
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
