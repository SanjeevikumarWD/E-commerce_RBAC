const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_discount: { type: Number, default: 0 },
  product_image: { type: String, required: true },
  sex: { type: String, enum: ["men", "women", "kids"], required: true },
  best_seller: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  product_description: { type: String, required: false }, // Optional
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
