import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import grpSrc from "../../assets/about_grp.jpg";
import Brands from "../brands/Brands";
import imgSrc from "../../assets/men.jpg";
import Designers from "./designer/Designers";

const About = () => {
  return (
    <div>
      <Header />
      <div className="pt-20">
        <div className="text-center my-10">
          <h1 className="text-4xl font-bold p-4 lg:p-10 lg:text-5xl xl:text-6xl">
            ABOUT US
          </h1>
          <p>
            Home <span className="text-blue-500">{`> About Us`}</span>
          </p>
        </div>

        <div className="my-20">
          <img
            src={grpSrc}
            alt=""
            className="w-full sm:h-80 lg:h-96  object-cover"
          />
        </div>

        <div className="p-1 text-center xl:w-[1000px] mx-auto ">
          {/* Grid container for large screens */}
          <div className="space-y-4 grid px-20 lg:grid-cols-2 xl:grid-cols-4 gap-10">
            {/* SHOP ONLINE */}
            <div className="flex flex-col lg:text-left mb-3 w-full max-w-[300px] mx-auto mt-4">
              <h1 className="font-semibold mb-1 text-lg">SHOP ONLINE</h1>
              <p className="tracking-wider text-lg font-thin">
                Explore a vast collection of premium clothing from the comfort
                of your home.
              </p>
            </div>

            {/* FREE SHIPPING */}
            <div className="flex flex-col lg:text-left mb-3 w-full max-w-[300px] mx-auto">
              <h1 className="font-semibold mb-1 text-lg">FREE SHIPPING</h1>
              <p className="tracking-wider text-lg font-thin">
                Enjoy the convenience of free shipping on all orders,
                nationwide.
              </p>
            </div>

            {/* RETURN POLICY */}
            <div className="flex flex-col lg:text-left mb-3 w-full max-w-[300px] mx-auto">
              <h1 className="font-semibold mb-1 text-lg">RETURN POLICY</h1>
              <p className="tracking-wider text-lg font-thin">
                Your satisfaction is our priority. Return any product you are
                not satisfied with.
              </p>
            </div>

            {/* PAYMENT METHODS */}
            <div className="flex flex-col lg:text-left mb-3 w-full max-w-[300px] mx-auto">
              <h1 className="font-semibold mb-1 text-lg">PAYMENT METHODS</h1>
              <p className="tracking-wider text-lg font-thin">
                Choose from a variety of secure payment methods to complete your
                transactions with ease.
              </p>
            </div>
          </div>
        </div>

        <div className="my-20 max-w-[1020px] mx-auto">
          <p className="font-bold text-center px-8 text-lg">
            At SNEV, we embrace a timeless philosophy that goes beyond fleeting
            trends, celebrating the essence of enduring style. Our collections
            artfully combine sophistication, versatility, and modernity,
            thoughtfully designed to elevate your personal expression. We
            believe fashion should empower, inspire, and tell the unique story
            of each individual. Serrena isn’t just about clothing—it’s about
            embracing a lifestyle where fashion becomes an art form and
            self-expression a beautiful narrative.
          </p>
        </div>

        <Brands />

        {/* designer */}
        <div className="text-center my-24 mx-3 lg:mx-32 xl:mx-20">
          <p className="font-bold text-2xl lg:text-left font-montserrat text-center mb-10">
            FOLLOW @SNEV
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-20 justify-center items-center ">
            <Designers imgSrc={imgSrc}/>
            <Designers imgSrc={imgSrc}/>
            <Designers imgSrc={imgSrc}/>
            <Designers imgSrc={imgSrc}/>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default About;
