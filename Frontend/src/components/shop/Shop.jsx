import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Cards from "../cards/Cards.jsx";
import useProductStore from "../store/ProductStore.js";
import { useLocation } from "react-router";

const About = () => {
  const location = useLocation();
  const initialCategory = location.state?.Category || "ALL";

  const [navigatedCategory, setNavigatedCategory] = useState(initialCategory);

  const [inPageCategory, setInPageCategory] = useState(navigatedCategory);

  // const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { products, kidsProducts, womenProducts, menProducts, fetchProducts } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    //update navigate category
    setNavigatedCategory(initialCategory);
    setInPageCategory(initialCategory); // Sync in-page category on navigation
  }, [initialCategory]);

  // const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filterProducts = () => {
    switch (inPageCategory) {
      case "MEN":
        return menProducts;
      case "WOMEN":
        return womenProducts;
      case "KIDS":
        return kidsProducts;
      default:
        return products;
    }
  };

  //To get change breadcrum and title dynamically
  const getCategoryDetails = () => {
    switch (navigatedCategory) {
      case "MEN":
        return { title: "MEN'S COLLECTION", breadcrumb: "Men's Collection" };
      case "WOMEN":
        return {
          title: "WOMEN'S COLLECTION",
          breadcrumb: "Women's Collection",
        };
      case "KIDS":
        return { title: "KIDS' COLLECTION", breadcrumb: "Kids' Collection" };
      default:
        return { title: "SHOP", breadcrumb: "Shop" };
    }
  };

  const { breadcrumb, title } = getCategoryDetails();

  return (
    <div>
      <Header />
      <div className="pt-20 lg:mx-10">
        <div className="text-center my-10">
          <h1 className="text-8xl font-bold p-4 lg:p-10 lg:text-5xl xl:text-6xl">
            {title}
          </h1>
          <p>
            Home <span className="text-blue-500">{`> ${breadcrumb}`}</span>
          </p>
        </div>

        <div className="text-left ">
          {
            <ul className="flex justify-center gap-4 mt-24 mb-20">
              <li
                className={`${
                  filterProducts() === products ? "text-gray-400" : "text-black"
                } cursor-pointer font-medium text-xl`}
                onClick={() => setInPageCategory("ALL")}
              >
                ALL
              </li>
              <li
                className={`${
                  filterProducts() === menProducts
                    ? "text-gray-400"
                    : "text-black"
                } cursor-pointer font-medium text-xl`}
                onClick={() => setInPageCategory("MEN")}
              >
                MEN
              </li>
              <li
                className={`${
                  filterProducts() === womenProducts
                    ? "text-gray-400"
                    : "text-black"
                } cursor-pointer font-medium text-xl`}
                onClick={() => setInPageCategory("WOMEN")}
              >
                WOMEN
              </li>
              <li
                className={`${
                  filterProducts() === kidsProducts
                    ? "text-gray-400"
                    : "text-black"
                } cursor-pointer font-medium text-xl`}
                onClick={() => setInPageCategory("KIDS")}
              >
                KIDS
              </li>
            </ul>
          }

          {/* Step 4: Cards Grid */}
          <div className="">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filterProducts().length > 0 && (
                <Cards value={filterProducts()} />
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default About;
