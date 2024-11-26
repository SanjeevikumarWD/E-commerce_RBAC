import React from "react";
import { FaInstagram } from "react-icons/fa6";

const Designers = ({ imgSrc }) => {
  return (
    <div className="rounded-lg w-full relative sm:w-[500px] lg:w-[350px] xl:w-[300px] aspect-square overflow-hidden mx-auto border-2">
      <img src={imgSrc} alt="people" className="w-full h-full object-cover" />
      <FaInstagram className="absolute bottom-3 left-3 lg:top-5 lg:right-5 xl:top-5 xl:right-5 font-semibold text-white text-4xl tracking-widest" />
    </div>
  );
};

export default Designers;
