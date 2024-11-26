import React from "react";
import { PiCrownCrossBold } from "react-icons/pi";
import { GiBearFace } from "react-icons/gi";
import { SiFaceit } from "react-icons/si";
import { SiFacebookgaming } from "react-icons/si";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";


const Brands = () => {
  return (
    <div>
      <div className="py-10 mx-1 my-10 flex flex-wrap space-x-10 justify-center gap-5 text-xl lg:text-2xl xl:text-3xl  text-gray-500">
        <p className="logo">
          <PiCrownCrossBold className="mr-2" />
          Puma
        </p>
        <p className="logo">
          <SiFacebookgaming className="mr-2" />
          Plukaso
        </p>
        <p className="logo">
          <GiPerspectiveDiceSixFacesOne className="mr-2" />
          Bento
        </p>
        <p className="logo">
          <SiFaceit className="mr-2" />
          Zara
        </p>
        <p className="logo">
          <GiBearFace className="mr-2" />
          Saku
        </p>
      </div>
    </div>
  );
};

export default Brands;
