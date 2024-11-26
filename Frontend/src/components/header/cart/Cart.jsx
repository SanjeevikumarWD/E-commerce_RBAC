import React, { useEffect, useState } from "react";
import useProductStore from "../../store/ProductStore";
import { useNavigate } from "react-router-dom";
import CartCards from "../CartCards";
import { TiTick } from "react-icons/ti";
import imgSrc from "../../../assets/about_grp.jpg"

const Cart = () => {
  const { cartItems, fetchCartItems, userId } = useProductStore();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false); // State to manage success message

  // Fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleCheckout = () => {
    setOrderSuccess(true); // Show success message
    setTimeout(() => setOrderSuccess(false), 2000); // Hide after 3 seconds
  };

  const subtotal = cartItems.reduce((total, item) => {
    const discountedPrice =
      item.product_price * (1 - item.product_discount / 100);
    return total + discountedPrice * (item.quantity || 1);
  }, 0);

  return (
    <div className="w-full mt-12">
      <h1 className="text-sm lg:text-lg px-5 py-3 border-y-2">MY CART</h1>
      {cartItems.length > 0 ? (
        <>
          <div className="h-[63vh] sm:h-[50vh] lg:h-[62vh] xl:h-[67vh] overflow-y-scroll">
            {cartItems.map((item) => (
              <CartCards
                key={item._id}
                imgSrc={item.product_image}
                title={item.product_name}
                price={item.product_price}
                userId={userId}
                productId={item._id}
              />
            ))}
          </div>
          <div className="px-5 mt-5 fixed bottom-0 bg-white w-full lg:w-[400px] xl:w-[500px]">
            <div className="flex justify-between py-3 border-y-2">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="w-full py-2 space-y-2 sm:w-full sm:text-center sm:my-7">
              <p className="text-[12px]">
                Shipping fee is calculated at the Checkout page
              </p>
              <button
                className="text-[14px] py-1 px-5 border-2 border-black rounded-full sm:w-1/2"
                onClick={handleCheckout}
              >
                Check Out
              </button>
            </div>
          </div>
          {orderSuccess && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
              <div className="bg-white py-6 rounded-sm shadow-lg text-center w-[400px] lg:w-[600px] lg:h-[400px] ">
                <div className="bg-green-500 flex items-center justify-center h-16 w-16 rounded-full mx-auto mb-4">
                  <TiTick className="text-4xl text-white" />
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  Order Successful!
                </h2>
                <p className="text-sm text-gray-600">
                  This is a dummy website order page.
                </p>
                <div className=" my-3 flex justify-center items-center ">
                  <img src={imgSrc} alt="img" className="w-full h-[100px] lg:h-[200px] object-cover" />
                </div>
                
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full mt-10 px-5">
          <p>Nothing in your Cart yet</p>
          <button
            className="mt-16 rounded-full border-2 border-black w-full mb-10 py-3"
            onClick={() => navigate("/home")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
