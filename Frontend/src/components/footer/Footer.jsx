import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoMailOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path, Category) => {
    navigate(path, { state: { Category } });
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  };

  return (
    <div className="p-5 border-t-2 border-t-gray-100 mt-20">
      {/* Flex container for large screens */}
      <div className="space-y-8 lg:flex lg:items-start lg:justify-evenly lg:ml-16">
        {/* First Section (Branding) */}
        <div className="flex-1 mt-[32px]">
          <h1 className="font-semibold mb-3 text-2xl">S N E V</h1>
          <p className="tracking-wider text-xl font-thin">
            Your Trusted Passion
          </p>
          <p className="tracking-wider text-xl font-thin">Companion</p>
        </div>

        {/* Second Section (Navigation) */}
        <div className="flex-1 h-[200px]">
          <h1 className="font-semibold mb-3 text-2xl">NAVIGATION</h1>
          <p
            className="tracking-wider text-xl font-thin cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            Home
          </p>
          <p
            className="tracking-wider text-xl font-thin cursor-pointer"
            onClick={() => handleNavigation("/shop")}
          >
            Shop
          </p>
          <p
            className="tracking-wider text-xl font-thin cursor-pointer"
            onClick={() => handleNavigation("/about")}
          >
            About
          </p>
          <p
            className="tracking-wider text-xl font-thin cursor-pointer"
            onClick={() => handleNavigation("/shop")}
          >
            Contact
          </p>
        </div>

        {/* Third Section (Categories) */}
        <div className="flex-1 h-[200px]">
          <h1 className="font-semibold mb-3 text-2xl">CATEGORIES</h1>
          <p
            className="tracking-wider text-xl font-thin cursor-pointer"
            onClick={() => handleNavigation("/shop", "MEN")}
          >
            Men
          </p>
          <p
            className="tracking-wider text-xl font-thin cursor-pointer"
            onClick={() => handleNavigation("/shop", "WOMEN")}
          >
            Women
          </p>
          <p
            className="tracking-wider text-xl font-thin cursor-pointer"
            onClick={() => handleNavigation("/shop", "KIDS")}
          >
            Kids
          </p>
        </div>

        {/* Social media */}
        <div className="flex-1 h-[200px] flex gap-3 text-4xl justify-start flex-col">
          <h1 className="font-semibold mb-3 text-2xl">CONTACT</h1>

          <div className="flex gap-6">
            <div className="relative group">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <FaInstagram />
              </a>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Dummy Instagram
              </span>
            </div>

            <div className="relative group">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <CiTwitter />
              </a>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Dummy Twitter
              </span>
            </div>

            <div className="relative group">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <AiOutlineYoutube />
              </a>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Dummy YouTube
              </span>
            </div>

            <div className="relative group">
              <a
                href="mailto:someone@example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <IoMailOpenOutline />
              </a>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Dummy Email
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="text-center my-5">
        <p className="tracking-wider text-lg">
          Developed By{" "}
          <a href="https://sanjeevikumarwd.onrender.com/" className="underline">
            @Saku
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
