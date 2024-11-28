import React, { useEffect, useState } from "react";
import axios from "axios";
import useProductStore from "../store/ProductStore";

const CartCards = ({ imgSrc, title, price, userId, productId, quantity, increment, decrement }) => {
  const { fetchCartItems } = useProductStore();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/cart/remove",
        {
          data: { userId, productId },
        }
      );

      if (response.data.success) {
        // Fetch updated cart items from the store
        fetchCartItems();
        console.log("Item removed successfully, updated cart fetched");
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error.message);
    }
  };


  
  return (
    <div className="flex justify-between p-4 space-x-2 border-b-2 pb-3">
      <div className="h-[100px] border-2">
        <img src={`http://localhost:3000/${imgSrc}`} alt="" className="w-full h-full" />
      </div>
      <div className="flex-1 pr-3 font-thin">
        <p className="px-2 mb-5">{title}</p>
        <div className="px-2 flex space-x-5 text-lg font-semibold">
          <button onClick={decrement}>
            -
          </button>
          <p>{quantity}</p>
          <button onClick={increment}>+</button>
        </div>
      </div>
      <div className="flex-2 flex flex-col justify-between">
        <p className="font-semibold text-xl">${price}</p>
        <button className="border-b-2 border-black" onClick={handleDelete}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCards;