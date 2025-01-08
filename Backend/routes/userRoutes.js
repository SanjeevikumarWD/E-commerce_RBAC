const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");


router.get("/", async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users); 
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/getall", async (req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json(products);
  }catch (error) {
    res.status(500).send("Error retrieving products: " + error.message);
  }
})






module.exports = router;
