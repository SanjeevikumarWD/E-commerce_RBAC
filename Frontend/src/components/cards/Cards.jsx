import React, { useState } from "react";
import men from "../../assets/men.jpg";
import useProductStore from "../store/ProductStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const Cards = ({ value }) => {
  const { products, login, setCartItems, userId } = useProductStore();
  const [cartMessage, setCartMessage] = useState({});
  const [activeCard, setActiveCard] = useState(null); // State to track active card
  const data = value || products;

  const navigate = useNavigate();

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/cart`, {
        params: { userId },
      });
      setCartItems(response.data); // Update global cart items using Zustand
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!login) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/cart", {
        userId,
        productId,
      });

      // Show success message
      setCartMessage((prev) => ({
        ...prev,
        [productId]: "Added to the cart!",
      }));
      setActiveCard(null);

      fetchCartItems(userId);

      setTimeout(() => {
        setCartMessage((prev) => {
          const newMessages = { ...prev };
          delete newMessages[productId];
          return newMessages;
        });
      }, 5000);
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response && error.response.status === 400
          ? "Already in the cart"
          : "Sorry, can't add";
      setCartMessage((prev) => ({
        ...prev,
        [productId]: errorMessage,
      }));
      setTimeout(() => {
        setCartMessage((prev) => {
          const newMessages = { ...prev };
          delete newMessages[productId];
          return newMessages;
        });
      }, 5000);
    }
  };

  const handleCardClick = (productId) => {
    setActiveCard((prev) => (prev === productId ? null : productId)); // Toggle active card
  };

  return (
    <>
      {data.map((product) => (
        <div
          key={product._id}
          className="group max-w-xs lg:max-w-[60%] xl:max-w-sm mx-auto bg-white rounded-lg overflow-hidden my-2 transition-all duration-300"
          onClick={() => handleCardClick(product._id)} // Set active card on click
        >
          {/* Image with discount */}
          <div className="relative">
            <img
              src={product.product_image}
              alt="Model image"
              className="w-full h-auto object-cover"
            />
            {product.product_discount && (
              <p className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                {`${product.product_discount} %`}
              </p>
            )}
            {cartMessage[product._id] && (
              <div className="absolute bottom-2 left-2 rounded-full p-3 lg:bottom-4 lg:left-4 bg-green-600">
                <FaCheck className="text-lg text-white" />
              </div>
            )}
            {activeCard === product._id && !cartMessage[product._id] && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col gap-2 items-center justify-center transition-opacity duration-300">
                <button
                  className="text-white bg-blue-400 px-6 py-2 text-xl font-medium rounded-md shadow-md hover:bg-gray-500"
                  onClick={() => handleAddToCart(product._id)}
                >
                  ADD TO CART
                </button>
              </div>
            )}
          </div>
          {/* Product Details */}
          <div className="p-4 text-left">
            <p className="text-gray-800 font-semibold text-sm lg:text-xl">
              {product.product_name}
            </p>
            <p className="text-gray-600 font-medium text-lg lg:text-xl xl:text-lg mt-2">
              {product.product_price}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Cards;
