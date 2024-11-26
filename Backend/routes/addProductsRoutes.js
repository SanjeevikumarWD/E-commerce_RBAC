const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");

// Create a new product
router.post("/products", upload.single("product_image"), async (req, res) => {
  try {
    const { product_name, product_price, product_discount, sex, best_seller, featured } = req.body;

    const product = new Product({
      product_name,
      product_price,
      product_discount,
      product_image: req.file ? req.file.path : null, // Save uploaded file path
      sex,
      best_seller: best_seller === "true",
      featured: featured === "true",
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: "Error saving product: " + error.message });
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products: " + error.message });
  }
});

module.exports = router;
