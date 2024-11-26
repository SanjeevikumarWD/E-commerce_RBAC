require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware/auth");

// Models
const User = require("./models/User");
const Staff = require("./models/Staff");
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

//to fetch staffs
const staffRoutes = require("./routes/staffRoutes");
app.use("/api/staffs", staffRoutes);

// MongoDB connections
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// JWT token verification route
app.get("/api/protected", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

// Routes
const registerRoutes = require("./routes/registerRoutes");
const Product = require("./models/Product");
app.use("/api", registerRoutes);

const productRoutes = require("./routes/addProductsRoutes");
app.use("/api", productRoutes);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// To get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error retrieving products" + error.message);
  }
});

app.use("/api", productRoutes);

app.post("/api/login", async (req, res) => {
  const { email, password, role } = req.body; // Accept role from frontend

  try {
    let user;
    if (role === "ADMIN") {
      // Compare admin email and password with .env values
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (email !== adminEmail || password !== adminPassword) {
        return res.status(401).json({ error: "Invalid Admin credentials" });
      }
      // Create a mock admin user object for JWT
      user = { id: "admin", email: adminEmail, role: "ADMIN" };
    } else if (role === "MANAGER") {

      user = await Staff.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Staff Not Found" });
      }

      if (!user.active) {
        return res.status(403).json({
          error: "Your account is inactive. Please contact the admin.",
        });
      }

      // Validate user password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid Password" });
      }
    } else {
      // For regular users, search in the Users DB
      user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }

      // Validate user password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid Password" });
      }
    }

    // JWT token generation
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: `${role} login successful`,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in: " + error.message });
  }
});

// To store products in user cart
app.post("/api/cart", async (req, res) => {
  const { userId, productId } = req.body;
  console.log(userId);
  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).send("User not found");

    if (!user.cartArray) {
      user.cartArray = [];
    }

    if (!user.cartArray.includes(productId)) {
      user.cartArray.push(productId);
      await user.save();
      return res
        .status(200)
        .send({ success: true, message: "Added", data: user.cartArray });
    } else {
      return res.status(400).send("Product already in cart");
    }
  } catch (error) {
    res.status(500).send("Error adding product to cart.");
  }
});

// Fetch cart items for a user
app.get("/api/cart", async (req, res) => {
  const { userId } = req.query; // Assuming userId is passed as a query parameter
  try {
    const user = await User.findById(userId).populate("cartArray"); // Populate to get full product details
    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user.cartArray); // Return the cart items
  } catch (error) {
    res.status(500).send("Error fetching cart items: " + error.message);
  }
});

// Remove product from user cart
app.delete("/api/cart/remove", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { cartArray: productId } }, // Remove the productId from the cartArray
      { new: true } // Return the updated document
    );

    if (!user) return res.status(404).send("User not found");

    res.status(200).send({ success: true, cart: user.cartArray });
  } catch (error) {
    res.status(500).send("Error removing product from cart: " + error.message);
  }
});

//Active toggle
app.put(`/api/staff/toggle-active/:id`, async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    staff.active = !staff.active; 
    await staff.save();
    res.status(200).json({ message: 'Active status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff status' });
  }
});


const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
