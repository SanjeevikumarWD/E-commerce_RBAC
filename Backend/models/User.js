const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartArray: {
    type: [mongoose.Schema.Types.ObjectId], // Array of product IDs
    ref: "Product", // Referencing the Product model to store product IDs in the cart
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
