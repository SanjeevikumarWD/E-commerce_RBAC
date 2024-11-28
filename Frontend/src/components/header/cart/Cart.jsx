import React, { useEffect, useState } from "react";
import useProductStore from "../../store/ProductStore";
import { useNavigate } from "react-router-dom";
import CartCards from "../CartCards";
import { TiTick } from "react-icons/ti";
import imgSrc from "../../../assets/about_grp.jpg";

const Cart = ({ handleCartClicked }) => {
  const { cartItems, fetchCartItems, userId } = useProductStore();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [quantity, setQuantity] = useState(Array(cartItems.length).fill(1));

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setQuantity(Array(cartItems.length).fill(1));
    }
  }, [cartItems]);

  const handleIncrement = (index) => {
    setQuantity((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] || 1) + 1; // Default to 1 if undefined
      return updated;
    });
  };

  const handleDecrement = (index) => {
    setQuantity((prev) => {
      const updated = [...prev];
      updated[index] = Math.max((updated[index] || 1) - 1, 1); // Prevent quantity < 1
      return updated;
    });
  };

  const subtotal = cartItems.reduce((total, item, index) => {
    const discountedPrice = item.product_price * (1 - item.product_discount / 100);
    const itemQuantity = quantity[index] || 1;
    return total + discountedPrice * itemQuantity;
  }, 0);

  if (!cartItems || !quantity) return <div>Loading...</div>;


  const handleCheckout = () => {
    setOrderSuccess(true); // Show success message
    setTimeout(() => setOrderSuccess(false), 2000); // Hide after 3 seconds
  };

  console.log(cartItems);

  return (
    <div className="w-full mt-12">
      <h1 className="text-sm lg:text-lg px-5 py-3 border-y-2">MY CART</h1>
      {cartItems.length > 0 ? (
        <>
          <div className="h-[63vh] sm:h-[50vh] lg:h-[50vh] xl:h-[67vh] overflow-y-scroll">
            {cartItems.map((item, index) => {
              const productImageUrl = item.product_image.replace(/\\/g, "/");
              if (!item.quantity) {
                item.quantity = 1;
              }
              return (
                <CartCards
                  key={item._id}
                  imgSrc={productImageUrl}
                  title={item.product_name}
                  price={item.product_price}
                  userId={userId}
                  item={item}
                  productId={item._id}
                  quantity={quantity[index]}
                  increment={() => handleIncrement(index)}
                  decrement={() => handleDecrement(index)}
                />
              );
            })}
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
                  <img
                    src={imgSrc}
                    alt="img"
                    className="w-full h-[100px] lg:h-[200px] object-cover"
                  />
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
            onClick={() => {
              handleCartClicked;
              navigate("/shop");
            }}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
