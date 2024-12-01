import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useProductStore from "../store/ProductStore";
import Header from "../header/Header";
import axios from "axios";
import { useNavigate } from "react-router";

const StaffHomePage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { products, fetchProducts, userRole } = useProductStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_name: "",
    product_price: "",
    product_discount: "",
    product_image: null,
    sex: "",
    best_seller: false,
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

  // Handle form input changes
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      product_image: file, // Store the selected file
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formDataToSend = new FormData();

    // Append form data to send in the request
    formDataToSend.append("product_id", formData.product_id);
    formDataToSend.append("product_name", formData.product_name);
    formDataToSend.append("product_price", formData.product_price);
    formDataToSend.append("product_discount", formData.product_discount || 0);
    formDataToSend.append("category", formData.sex);
    formDataToSend.append("best_seller", formData.best_seller);
    formDataToSend.append("featured", formData.featured);

    // Append the image if present
    if (formData.product_image) {
      formDataToSend.append("product_image", formData.product_image);
    }

    try {
      console.log(isEditMode);
      let response = await axios.post(
        `${API_URL}/api/product`,
        formDataToSend
      );

      // Check if the response is successful
      if (response.status === 200 || response.status === 201) {
        console.log("Product updated/created successfully", response.data);

        setModalOpen(false); // Close modal
        setFormData({
          product_name: "",
          product_price: "",
          product_discount: "",
          sex: "",
          best_seller: false,
          featured: false,
          product_image: null,
        });
        fetchProducts();
      } else {
        throw new Error("Failed to update or create product");
      }
    } catch (error) {
      console.error("Error updating/creating product:", error);
      alert("Failed to update or create product");
    }
  };

  // Handle delete product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API_URL}/api/products/${productId}`);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Open modal with selected product data for editing
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setFormData({
      product_id:product.product_id,
      product_name: product.product_name,
      product_price: product.product_price,
      product_discount: product.product_discount,
      product_image: null, // Image handling for edit can be tricky
      sex: product.sex,
      best_seller: product.best_seller,
      featured: product.featured,
    });
    setModalOpen(true);
  };

  return (
    <>
      <Header />
      <div className="mt-20 p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Discount</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    {product.product_name}
                  </td>
                  <td className="py-3 px-6 text-left">
                    ${product.product_price}
                  </td>
                  <td className="py-3 px-6 text-left uppercase">
                    {product.sex}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {product.product_discount}%
                  </td>
                  <td className="py-3 px-6 text-center flex justify-center space-x-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 lg:w-[700px]">
            <h2 className="text-lg font-bold mb-4">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  required
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product ID</label>
                <input
                  type="number"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleInputChange}
                  required
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="product_price"
                  value={formData.product_price}
                  onChange={handleInputChange}
                  required
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Discount</label>
                <input
                  type="number"
                  name="product_discount"
                  value={formData.product_discount}
                  onChange={handleInputChange}
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  required
                  className="border-b-2 outline-none bg-transparent py-1 w-full mt-2"
                >
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
              <div className="mb-7">
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  name="product_image"
                  onChange={handleFileChange}
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>
              <div className="mb-6">
                <label className="inline-flex items-center text-gray-700">
                  Best Seller
                </label>
                <input
                  type="checkbox"
                  name="best_seller"
                  checked={formData.best_seller}
                  onChange={handleInputChange}
                  className="ml-2"
                />
              </div>
              <div className="mb-6">
                <label className="inline-flex items-center text-gray-700">
                  Featured
                </label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="ml-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {isEditMode ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffHomePage;
