import React, { useState, useEffect } from "react";
import imgSrc from "../../assets/home_hero.jpeg";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useProductStore from "../store/ProductStore";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {userRole} =useProductStore();
  
  const [message, setMessage] = useState("");
  const location = useLocation();
  
  const isAdminRoute = location.pathname.includes("/admin/register");
  
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginData = async () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match 😒");
      return;
    }

    const route = isAdminRoute
      ? "http://localhost:3000/api/admin/register"
      : "http://localhost:3000/api/register";
    console.log(route);
    // Prepare the request payload
    const data = {
      name: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    // If it's for the admin route, include the role as "STAFF"
    if (isAdminRoute) {
      data.role = "STAFF"; // Set role as STAFF for admin registration
    }

    try {
      const response = await axios.post(route, data);

      if (response.status === 201) {
        setMessage("Account Created Successfully! Hold on a sec....");
        if (userRole === "ADMIN") {
          setTimeout(() => {
            window.alert("Staff account created!");
            navigate("/admin/user");
          }, 2000); 
        } else {
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.error
        ? error.response.data.error
        : "Something went wrong. Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <div className="lg:flex ">
        <div className="flex justify-center mt-16">
          <img
            src={imgSrc}
            alt="Create Account"
            className="w-full h-full lg:w-[500px] object-cover mb-8"
          />
        </div>

        <div className="mt-20 w-[400px] sm:w-[425px] mx-auto">
          <div className="px-4 py-2">
            <h1 className="py-5 font-regular text-[18px]">
              {isAdminRoute ? "Create Staff Account" : "Create User Account"}
            </h1>
            <p className="text-[12px] pb-14">Please fill out the form</p>

            {message && (
              <p
                className={`${
                  message.includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                } mb-10`}
              >
                {message}
              </p>
            )}

            <div className="flex flex-col w-full gap-8 mx-auto">
              <div className="flex gap-4 w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInput}
                    className="border-b-2 outline-none bg-transparent py-1 w-full"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInput}
                    className="border-b-2 outline-none bg-transparent py-1 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInput}
                  className="border-b-2 outline-none bg-transparent py-1 w-full"
                />
              </div>
            </div>

            <button
              className="w-full border border-black rounded-full py-3 mt-8 lg:px-5 lg:mt-10 lg:w-auto"
              onClick={handleLoginData}
            >
              {isAdminRoute ? "Create Staff Account" : "Create User Account"}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
