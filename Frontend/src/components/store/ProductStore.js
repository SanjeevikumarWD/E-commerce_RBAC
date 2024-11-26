import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set, get) => ({
  login: false,
  token: null,
  userId: null,
  userRole: null,
  products: [],
  menProducts: [],
  womenProducts: [],
  kidsProducts: [],
  bestSellers: [],
  featuredProducts: [],
  cartItems: [],
  // user:[],
  // staffs:[],

  fetchProducts: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
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

      const response = await axios.get("http://localhost:3000/api/cart", {
        params: { userId },
      });

      set({ cartItems: response.data }); // Update cartItems state
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  },

  // Fetch all users from the database
  fetchUsers: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      const users = response.data;

      set({ users });
      console.log("Fetched users:", users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  //Fetch all staffs from the databse
  fetchStaffs: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/staffs");
      const staffs = response.data
      set({staffs});
      console.log("Fetched staffs:", staffs)
    } catch (error) {
      console.error("Error fetching users:", error);

    }
  },

  setLoginState: ({ loginState, token, userId, userRole }) => {
    set({ login: loginState, token, userId, userRole });
    console.log("Login state updated from product store:", {
      loginState,
      token,
      userId,
      userRole,
    });
  },

  setCartItems: (newCartItems) => {
    set({ cartItems: newCartItems });
  },
}));

export default useProductStore;

// import { create } from "zustand";
// import axios from "axios";

// const useProductStore = create((set, get) => ({
//   user: [],
//   login: false,
//   token: null,
//   userId: null,
//   userRole: null,
//   products: [],
//   menProducts: [],
//   womenProducts: [],
//   kidsProducts: [],
//   bestSellers: [],
//   featuredProducts: [],
//   cartItems: [],
//   users: [],

//   // Fetch all products and categorize them
//   fetchProducts: async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/products");
//       const products = response.data;

//       set({
//         products,
//         bestSellers: products
//           .filter((product) => product.best_seller === true)
//           .slice(0, 4),
//         featuredProducts: products
//           .filter((product) => product.featured === true)
//           .slice(0, 4),
//         menProducts: products.filter((product) => product.sex === "men"),
//         womenProducts: products.filter((product) => product.sex === "women"),
//         kidsProducts: products.filter((product) => product.sex === "kids"),
//       });
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   },

// fetchCartItems: async () => {
//   try {
//     const userId = get().userId;
//     if (!userId) {
//       console.error("User ID is not available.");
//       return;
//     }

//     const response = await axios.get("http://localhost:3000/api/cart", {
//       params: { userId },
//     });

//     set({ cartItems: response.data }); // Update cartItems state
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//   }
// },

// // Fetch all users from the database
// fetchUsers: async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/api/users");
//     const users = response.data;

//     set({ users });
//     console.log("Fetched users:", users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//   }
// },

//   // Set the cart items manually
//   setCartItems: (newCartItems) => {
//     set({ cartItems: newCartItems });
//   },

//   // Update login state
//   setLoginState: ({ loginState, token, userId, userRole }) => {
//     set({
//       login: loginState,
//       token,
//       userId,
//       userRole,
//     });
//   },
// }));

// export default useProductStore;
