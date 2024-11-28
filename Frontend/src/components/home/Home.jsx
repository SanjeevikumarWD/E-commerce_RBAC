import React, { useEffect } from "react";
import Header from "../header/Header";
import homeHero from "../../assets/home_hero.jpeg";
import Cards from "../cards/Cards";
import videoSource from "../../assets/home_video.mp4";
import men from "../../assets/images/men2.png";
import women from "../../assets/images/women.jpg";
import Carousel from "../carousel/Carousel";
import Footer from "../footer/Footer";
import Brands from "../brands/Brands";
import { GoArrowRight } from "react-icons/go";
import useProductStore from "../store/ProductStore";
import { useNavigate } from "react-router";

const Home = () => {

  const {  bestSellers, featuredProducts, fetchProducts, cartItems } =
    useProductStore();

  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts,cartItems]);


  return (
    <div>
      <Header />
      {/* hero image */}
      <div className="relative pt-16 overflow-x-hidden">
        <img
          src={homeHero}
          alt="Home Hero"
          className="w-full h-[400px] object-cover lg:h-auto"
        />
        <div className="absolute top-30 left-0 right-0 bottom-0 px-6 py-8 lg:top-[400px] xl:top-[600px] xl:left-16">
          <p className="text-gray-50 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat">
            Unleash Your Style
          </p>
          <p className="text-gray-50 text-xs sm:text-lg md:text-xl lg:text-2xl font-semibold font-montserrat">
            Discover the latest trends that speak to your individuality.
            Quality, comfort, and style — all in one place.
          </p>
          <button className="mt-4 px-6 py-2 text-xs bg-black text-white lg:text-xl" onClick={() => navigate('/shop')}>
            Shop Now
          </button>
        </div>
      </div>

      {/* brands */}
      <Brands />

      {/* best seller */}
      <div className="text-left my-24">
        <p className="font-bold text-2xl lg:text-4xl xl:text-6xl font-montserrat text-left pl-[15px] ">
          BEST SELLER
        </p>
        <div className="xl:flex my-10 ">
          {bestSellers.length > 0 && <Cards value={bestSellers} />}
        </div>
      </div>

      {/* video */}
      <div className="relative w-screen h-[400px] sm:h-[400px] lg:h-[500px] xl:h-[800px] ">
        <video
          src={videoSource}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        ></video>
        {/* filter */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="absolute top-[98px] sm:top-[160px] lg:top-[240px] text-start px-4 sm:px-8 w-[400px] sm:w-[600px] lg:w-[800px] ">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-normal font-montserrat mb-3 ">
            S N E V EXCLUSIVE DEAL
          </h1>
          <h1 className="text-white text-base sm:text-lg lg:text-xl font-normal font-montserrat mb-4">
            Experience the pinnacle of style with SNEV Exclusives. Transform
            your wardrobe with top-tier brands that blend luxury and fashion
            seamlessly. Step into a realm of unmatched sophistication. Discover
            it today!
          </h1>
          <button className="mt-4 text-white text-lg sm:text-xl lg:text-2xl font-semibold flex items-center gap-2 " onClick={() => navigate('/shop')}>
            VISIT SHOP
            <GoArrowRight className="text-2xl sm:text-3xl lg:text-4xl font-bold" />
          </button>
        </div>
      </div>

      {/* Featured */}
      <div className="text-center my-24">
        <p className="font-bold text-2xl lg:text-4xl xl:text-6xl font-montserrat text-left pl-[15px]">
          FEATURED
        </p>
        <div className="xl:flex my-10">
          {featuredProducts.length > 0 && <Cards value={featuredProducts} />}
        </div>
      </div>

      {/* Shop */}
      <div className="text-center my-24">
        {/* SHOP and VISIT SHOP button */}
        <div className="block space-y-7 lg:flex lg:px-24 xl:px-4 lg:justify-between lg:items-center mb-7">
          <p className="font-bold text-2xl lg:text-4xl xl:text-6xl  font-montserrat text-center lg:text-left">
            SHOP
          </p>
          <button className="bg-blue-500 text-white px-4 py-3 rounded-sm"  onClick={() => navigate('/shop')}>
            VISIT SHOP
          </button>
        </div>

        {/* Image containers */}
        <div className="flex flex-col lg:flex-col xl:flex-row justify-center items-center w-full lg:space-y-6 xl:space-y-0 ">
          {/* MEN */}
          <div className="relative p-3 w-full lg:w-[800px] xl:w-1/2 aspect-square lg:mx-20 xl:mx-1  overflow-hidden">
            <img
              src={men}
              alt="MEN"
              className="w-full h-full object-cover rounded-md"
            />
            <p className="absolute bottom-8 left-8 font-semibold text-white tracking-widest">
              MEN
            </p>
          </div>
          {/* WOMEN */}
          <div className="relative p-3 w-full lg:w-[800px] xl:w-1/2 aspect-square lg:mx-20 xl:mx-1  overflow-hidden">
            <img
              src={women}
              alt="WOMEN"
              className="w-full h-full object-cover rounded-md"
            />
            <p className="absolute bottom-8 left-8 font-semibold text-white tracking-widest">
              WOMEN
            </p>
          </div>
        </div>
      </div>

      {/* You may also like */}
      <Carousel />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
