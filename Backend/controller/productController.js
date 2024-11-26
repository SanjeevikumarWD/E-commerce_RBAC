const Product = require('../models/productModel');

// Add new product
exports.addProduct = async (req, res) => {
  const { product_name, product_price, product_discount, sex, best_seller, featured } = req.body;
  const product_image = req.file ? req.file.path : null;  // Handle image

  const newProduct = new Product({
    product_name,
    product_price,
    product_discount,
    sex,
    best_seller,
    featured,
    product_image
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

// Edit product
exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, product_price, product_discount, sex, best_seller, featured } = req.body;
  const product_image = req.file ? req.file.path : null;  // Handle image

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      product_name,
      product_price,
      product_discount,
      sex,
      best_seller,
      featured,
      product_image
    }, { new: true });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted', deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
