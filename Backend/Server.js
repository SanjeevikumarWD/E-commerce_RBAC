require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware/auth");
const upload = require("./middleware/upload");

// Models
const User = require("./models/User");
const Staff = require("./models/Staff");
const Product = require("./models/Product");

// Initialize express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes import
const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");
const registerRoutes = require("./routes/registerRoutes");

// Routes setup
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/staffs", staffRoutes); // Staff-related routes
app.use("/api", registerRoutes); // Register-related routes

// Serve uploaded files
app.use("/uploads", express.static("uploads")); // Static files (like images) served from /uploads

// POST /api/products - Create a new product
app.post("/api/product", upload.single("product_image"), async (req, res) => {
  try {
    const {
      product_name,
      product_price,
      product_id,
      product_discount,
      category,
      best_seller,
      featured,
    } = req.body;

    // Handle saving the product to the database
    const product = new Product({
      product_id,
      product_name,
      product_price,
      product_discount,
      product_image: req.file ? req.file.path : null, // Handle product image upload
      sex: category,
      best_seller: best_seller === "true", // Convert to boolean
      featured: featured === "true", // Convert to boolean
    });

    await product.save();
    console.log("Product saved successfully");
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).json({ error: "Error saving product: " + error.message });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from DB
    res.json(products); // Return the products as JSON
  } catch (error) {
    res.status(500).send("Error retrieving products: " + error.message);
  }
});

// JWT token verification route (protected route example)
app.get("/api/protected", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

// Login Route (with role-based authentication)
app.post("/api/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === "ADMIN") {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (email !== adminEmail || password !== adminPassword) {
        return res.status(401).json({ error: "Invalid Admin credentials" });
      }
      user = { id: "admin", email: adminEmail, role: "ADMIN" };
    } else if (role === "MANAGER") {
      user = await Staff.findOne({ email });
      if (!user) return res.status(404).json({ error: "Staff Not Found" });
      if (!user.active)
        return res
          .status(403)
          .json({
            error: "Your account is inactive. Please contact the admin.",
          });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ error: "Invalid Password" });
    } else {
      user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "User Not Found" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ error: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: `${role} login successful`, user, token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in: " + error.message });
  }
});

// Add product to user cart
app.post("/api/cart", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    if (!user.cartArray) user.cartArray = [];

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
  const { userId } = req.query; // Get userId from query params
  try {
    const user = await User.findById(userId).populate("cartArray"); // Populate cart array with full product details
    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user.cartArray); // Return populated cart items
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
      { $pull: { cartArray: productId } }, // Remove product from cart
      { new: true } // Return updated user document
    );

    if (!user) return res.status(404).send("User not found");

    res.status(200).send({ success: true, cart: user.cartArray });
  } catch (error) {
    res.status(500).send("Error removing product from cart: " + error.message);
  }
});

// Toggle staff's active status
app.put(`/api/staff/toggle-active/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    staff.active = !staff.active; // Toggle active status
    await staff.save();
    res.status(200).json({ message: "Active status updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating staff status" });
  }
});

// Start server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
