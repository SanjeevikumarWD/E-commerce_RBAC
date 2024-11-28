import React, { useRef, useState, useEffect } from "react";
import { TbMenu } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
// import { IoLogOut } from "react-icons/io5";
import Cart from "../header/cart/Cart.jsx";
import useProductStore from "../store/ProductStore.js";

const Header = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [desktopDropdownVisible, setDesktopDropdownVisible] = useState(false);
  const [mobileDropdownVisible, setMobileDropdownVisible] = useState(false);

  const { login, userRole, setLoginState, cartItems } = useProductStore();


  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleCartClicked = () => {
    setCartClicked((prev) => !prev);
  };

  const handleNavigation = (path, Category = null, Role = null) => {
    if (path === "bottom") {
      // Scroll to the bottom of the page for the contact section
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      setMenuClicked(false); // Close menu on mobile
    } else {
      const state = {};
      if (Category) state.Category = Category;
      if (Role) state.Role = Role;

      setDesktopDropdownVisible(false);
      setMobileDropdownVisible(false);
      setMenuClicked(false);
      setTimeout(() => navigate(path, { state }), 0);
    }
  };

  const toggleDesktopDropdown = () => {
    setDesktopDropdownVisible((prev) => !prev);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close desktop dropdown if clicked outside
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target)
      ) {
        setDesktopDropdownVisible(false);
      }
      // Close mobile dropdown if clicked outside
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setMobileDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(userRole);

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div
            className="text-3xl tracking-widest font-mono font-thin cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            SNEV
          </div>

          {/* Mobile Menu Toggle */}
          <div
            className="block xl:hidden"
            onClick={() => setMenuClicked((prev) => !prev)}
          >
            {menuClicked ? (
              <RxCross2 className="text-2xl" />
            ) : (
              <TbMenu className="text-2xl" />
            )}
          </div>

          {/* Desktop Menu */}
          <div className="items-center space-x-6 hidden text-base xl:flex xl:text-xl font-medium">
            {userRole === "USER" ||
            userRole === "MANAGER" ||
            userRole === null ? (
              <>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/shop")}
                >
                  SHOP
                </p>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/shop", "MEN")}
                >
                  MEN
                </p>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/shop", "WOMEN")}
                >
                  WOMEN
                </p>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/shop", "KIDS")}
                >
                  KIDS
                </p>
                {userRole === "MANAGER" && <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/staff/store")}
                >
                  STOCK
                </p>}
              </>
            ) : null}
            {userRole === "ADMIN" && (
              <>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/admin/user")}
                >
                  USERS
                </p>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/admin/order")}
                >
                  ORDERS
                </p>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/admin/stock")}
                >
                  STOCK
                </p>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/admin/sale")}
                >
                  SALES
                </p>
                
              </>
            )}
          </div>

          {/* Right Menu */}
          <div className="items-center space-x-6 hidden text-base xl:flex xl:text-xl font-medium">
            {userRole === "USER" || userRole === null ? (
              <>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("bottom")}
                >
                  CONTACT
                </p>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleNavigation("/about")}
                >
                  ABOUT
                </p>
              </>
            ) : null}

            {login && (
              <p
                className="text-xl  text-white px-3 py-1 rounded-full bg-red-500"
                onClick={() => {
                  setLoginState({
                    loginState: false,
                    token: null,
                    user: null,
                    userRole: null,
                  });
                  navigate("/");
                }}
              >
                Logout
              </p>
            )}

            {/* Contact Dropdown */}
            <div className="relative" ref={desktopDropdownRef}>
              
              <IoMdContact
                className="cursor-pointer text-4xl"
                onClick={toggleDesktopDropdown}
              />
              {!login && desktopDropdownVisible && (
                <div className="absolute right-7 top-7 mt-2 w-40 bg-white border rounded shadow-md z-50">
                  <p
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => handleNavigation("/login", null, "ADMIN")}
                  >
                    Admin
                  </p>
                  <p
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => handleNavigation("/login", null, "MANAGER")}
                  >
                    Manager
                  </p>
                  <p
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => handleNavigation("/login", null, "USER")}
                  >
                    User
                  </p>
                </div>
              )}
            </div>

            {userRole === "USER" && (
              <p
                className="cursor-pointer text-3xl relative"
                onClick={handleCartClicked}
              >
                <FaBagShopping />
                <p className="absolute top-0 left-4 bg-red-500 text-white h-2 w-2 p-2 rounded-full flex justify-center items-center text-[9px] cursor-pointer ">{cartItems.length}</p>
              </p>
            )}
          </div>
        </div>

        {/* Mobile Menu ---------------------------------------------------------*/}
        <div
          className={`${
            menuClicked ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } xl:hidden transition-all ease-in-out duration-700 overflow-hidden px-6 py-2 font-montserrat font-medium border-y-2 space-y-2 absolute top-18 pt-7 left-0 right-0 bg-white z-10`}
        >
          {userRole === "USER" ||
          userRole === "MANAGER" ||
          userRole === null ? (
            <>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/shop")}
              >
                SHOP
              </p>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/shop", "MEN")}
              >
                MEN
              </p>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/shop", "WOMEN")}
              >
                WOMEN
              </p>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/shop", "KIDS")}
              >
                KIDS
              </p>
            </>
          ) : null}
          {userRole === "ADMIN" && (
            <>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/admin/user")}
              >
                USERS
              </p>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/admin/role")}
              >
                ROLES
              </p>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/admin/order")}
              >
                ORDERS
              </p>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/admin/stock")}
              >
                STOCK
              </p>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/admin/sale")}
              >
                SALES
              </p>
            </>
          )}

          {userRole === null || userRole === "USER" ? (
            <>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("bottom")}
              >
                CONTACT
              </p>
              <p
                className="text-4xl font-light text-gray-500 cursor-pointer"
                onClick={() => handleNavigation("/about")}
              >
                ABOUT
              </p>
            </>
          ) : null}

          <div className="flex flex-col items-end space-y-4">
            <div
              className="relative flex items-center  w-full justify-end"
              ref={mobileDropdownRef}
            >
              <div>
                {login && (
                  <p
                    className="text-xl absolute bottom-0 right-16 text-white px-3 py-1 cursor-pointer rounded-full bg-red-500"
                    onClick={() => {
                      setLoginState({
                        loginState: false,
                        token: null,
                        user: null,
                        userRole: null,
                      });
                      navigate("/");
                    }}
                  >
                    Logout
                  </p>
                )}
              </div>
              <IoMdContact
                className="cursor-pointer text-4xl"
                onClick={toggleMobileDropdown}
              />
              {mobileDropdownVisible && (
                <div className="absolute right-10 bottom-1 mt-2 w-40 bg-white border rounded shadow-md z-50">
                  <p
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => handleNavigation("/login", null, "ADMIN")}
                  >
                    Admin
                  </p>
                  <p
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => handleNavigation("/login", null, "MANAGER")}
                  >
                    Manager
                  </p>
                  <p
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => handleNavigation("/login", null, "USER")}
                  >
                    User
                  </p>
                </div>
              )}
            </div>

            {userRole === "USER" && (
              <p
              className="cursor-pointer text-3xl relative"
              onClick={handleCartClicked}
            >
              <FaBagShopping />
              <p className="absolute top-0 left-3 bg-red-500 text-white h-2 w-2 p-3 rounded-full flex justify-center items-center text-[12px] ">0</p>
            </p>
            )}
          </div>
        </div>
      </div>

      {/* Cart Component */}
      {cartClicked && (
        <div
          className="fixed top-0 right-0 z-50 w-full h-full bg-opacity-50 flex justify-end lg:w-[40%]"
          onClick={() => handleCartClicked(false)}
        >
          <div
            className="bg-white w-full lg:w-[500px] h-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Cart handleCartClicked={handleCartClicked}/>
            <button
              className="absolute top-4 right-4 text-xl"
              onClick={() => handleCartClicked(false)}
            >
              <RxCross2 />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
