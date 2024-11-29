import React, { useState } from "react";
import useProductStore from "../store/ProductStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const Cards = ({ value }) => {
  const { products, login, setCartItems, userId, userRole } = useProductStore();
  const [cartMessage, setCartMessage] = useState({});
  const [activeCard, setActiveCard] = useState(null); // State to track active card
  const data = value || products;

  const navigate = useNavigate();

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(`https://e-commerce-rbac-backend.onrender.com/api/cart`, {
        params: { userId },
      });
      setCartItems(response.data);
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
      await axios.post("https://e-commerce-rbac-backend.onrender.com/api/cart", {
        userId,
        productId,
      });

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
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 p-10 w-screen ">
      {data.map((product) => {
        const productImageUrl = product.product_image.replace(/\\/g, "/");
        return (
          <div
            key={product._id}
            className="bg-white rounded-lg overflow-hidden  transition-all duration-300"
            onClick={() => handleCardClick(product._id)}
          >
            {/* Image Container */}
            <div className="relative  h-[500px] lg:h-[px] ">
              <img
                src={`https://e-commerce-rbac-backend.onrender.com/${productImageUrl}`}
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
              {product.product_discount && (
                <p className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {`${product.product_discount} %`}
                </p>
              )}
              {cartMessage[product._id] && (
                <div className="absolute bottom-2 left-2 rounded-full p-3 bg-green-600">
                  <FaCheck className="text-lg text-white" />
                </div>
              )}
              {activeCard === product._id && !cartMessage[product._id] && userRole !== "MANAGER" && (
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
            {/* Details Container */}
            <div className="p-4 text-left">
              <p className="text-gray-800 font-regular text-lg truncate">
                {product.product_name}
              </p>
              <p className="text-gray-600 font-extralight text-lg mt-2">
                ₹{product.product_price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
