import React, { useRef } from "react";
import Cards from "../cards/Cards";
import useProductStore from "../store/ProductStore";

const Carousel = () => {
  const scrollContainerRef = useRef(null);
  const { products } = useProductStore();

  // Get the first 10 products
  const carouselProducts = products.slice(0, 10);

  // Scroll handlers
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="text-center my-40">
      <p className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-montserrat text-center mb-6">
        YOU MAY ALSO LIKE
      </p>

      {/* Scrolling container */}
      <div
        ref={scrollContainerRef}
        className="py-5 space-x-16 lg:space-x-0 xl:space-x-6 flex justify-start overflow-x-auto scroll-smooth mx-auto px-4 sm:px-6 scrollbar-hide"
      >
        {/* Responsive Cards */}
        {carouselProducts.map((product) => (
          <div
            key={product._id}
            className="
              flex-shrink-0 
              w-[90%] sm:w-[30%] 
              lg:w-[48%] xl:w-[35%] 
              max-w-[400px] 
              m-0 p-0"
          >
            <Cards value={[product]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
