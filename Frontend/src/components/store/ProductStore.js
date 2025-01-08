import { create } from "zustand";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const useProductStore = create((set, get) => ({
  login: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId") || null,
  userRole: localStorage.getItem("userRole") || null,
  products: [],
  menProducts: [],
  womenProducts: [],
  kidsProducts: [],
  bestSellers: [],
  featuredProducts: [],
  cartItems: [],



  fetchProducts: async () => {
    try {
      const response = await axios.get(
        `${api_url}/api/getall`
      );
      const products = response.data;
      set({
        products,
        bestSellers: products
          .filter((product) => product.best_seller === true)
          .slice(0, 4),
        featuredProducts: products
          .filter((product) => product.featured === true)
          .slice(0, 4),
        menProducts: products.filter((product) => product.sex === "men"),
        womenProducts: products.filter((product) => product.sex === "women"),
        kidsProducts: products.filter((product) => product.sex === "kids"),
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  fetchCartItems: async () => {
    try {
      const userId = get().userId;
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      const response = await axios.get(
        `${api_url}/api/cart`,
        {
          params: { userId },
        }
      );

      localStorage.setItem("cartItems", JSON.stringify(response.data));

      set({ cartItems: response.data });
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  },

  // Fetch all users from the database
  fetchUsers: async () => {
    try {
      const response = await axios.get(
        `${api_url}/api/users`
      );
      const users = response.data;

      localStorage.setItem("users", JSON.stringify(users));
      set({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  //Fetch all staffs from the databse
  fetchStaffs: async () => {
    try {
      const response = await axios.get(
        `${api_url}/api/staffs`
      );
      const staffs = response.data;
      set({ staffs });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  setLoginState: ({ loginState, token, userId, userRole }) => {
    // Store token and user data in localStorage
    if (loginState) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole);
    } else {
      // Remove token and user data from localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("cartItems");
    }

    set({ login: loginState, token, userId, userRole });
  },

  setCartItems: (newCartItems) => {
    set({ cartItems: newCartItems });
  },
}));

export default useProductStore;
