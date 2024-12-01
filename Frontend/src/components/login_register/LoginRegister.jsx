import React, { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useProductStore from "../store/ProductStore";

const LoginRegister = () => {
  const { setLoginState } = useProductStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const role = location.state?.Role || "USER";
  const API_URL = process.env.REACT_APP_API_URL;


  const handleCreateAccount = () => {
    if (role === "USER") {
      // Navigate only if the role is USER
      setTimeout(() => navigate("/register", { state: { role } }), 0);
    } else {
      alert("Only users can create an account.");
    }
  };

  const handleLogin = async () => {
    setError(""); // Clear previous error
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
        role,
      });

      const { token, user } = response.data;

      setLoginState({
        loginState: true,
        token,
        userId: user._id,
        userRole: role,
      });


      localStorage.setItem("token", token);

      
      // this is to navigate home page based on role
      if (role === "ADMIN") {
        navigate("/admin/user");
      } else if (role === "MANAGER") {
        navigate("/staff/store");
      } else {
        navigate("/");
      }


    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || "Login failed.");
      } else {
        console.log(error.message);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div >
      <Header />
      <div className="mt-20 w-[400px] sm:w-[425px] mx-auto lg:w-full lg:max-w-[900px]">
        <div className="lg:flex lg:gap-8">
          {/* Log In Section */}
          <div className="px-4 py-2 w-full lg:w-1/2">
            <h1 className="py-5 font-regular text-[18px]">Log In as {role}</h1>
            <p className="text-[12px] pb-14">Already have an account? Log In</p>

            {error && <p className="text-red-500 mb-10">{error}</p>}

            {/* Form Container */}
            <div className="flex flex-col w-full gap-8 mx-auto">
              {/* Email Input */}
              <div className="flex flex-col w-full">
                <label htmlFor="create-email">Email</label>
                <input
                  type="email"
                  id="create-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col w-full">
                <label htmlFor="create-password">Password</label>
                <input
                  type="password"
                  id="create-password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              className="w-full border border-black rounded-full py-3 lg:py-1 lg:px-3 mt-8 lg:mt-10 lg:w-auto"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>

          {/* Create Account Section */}
          <div className="mt-16 lg:mt-0 px-4 py-10 border-t-2 border-t-gray-200 lg:border-t-0 lg:border-l-2 lg:border-l-gray-200 w-full lg:w-1/2">
            <h1 className="py-5 font-regular text-[18px]">Create an account</h1>
            <p className="text-[12px] pb-14">
              Don't have an account?
              <a href="/register" className="text-blue-600 hover:underline">
                Create Account
              </a>
            </p>

            <p className="text-[14px] mb-8">
              By creating an account with our store, you will be able to move
              through the checkout process faster, store multiple shipping
              addresses, view and track your orders and save wishlist in your
              account and more.
            </p>

            {/* Create Account Button */}
            <button
              className="w-full border border-black rounded-full py-3 lg:py-1 lg:px-3 mt-8 lg:mt-0 lg:w-auto"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginRegister;
