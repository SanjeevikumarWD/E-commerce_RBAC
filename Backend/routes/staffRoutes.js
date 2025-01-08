const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.status(200).json(staffs);
  } catch (error) {
    console.error("Error fetching staffs:", error);
    res.status(500).json({ message: "Failed to fetch staffs" });
  }
});

router.post("/addProduct", async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      productDiscount,
      productImage,
      sex,
      bestSeller,
      featured,
    } = req.body;


    // Create product with corrected field names and types
    const product = await Product.create({
      product_name: productName,
      product_price: Number(productPrice),
      product_discount: Number(productDiscount),
      product_image: productImage,
      sex,
      best_seller: bestSeller,
      featured,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error adding product: " + error.message });
  }
});

router.delete("/deleteProduct/:productId", async (req, res) => {
  try{
    const productId = req.params.productId;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  }catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product: " + error.message });
  }
})


module.exports = router;
