const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');

const upload = multer({ dest: 'uploads/' }); 

const router = express.Router();

// Routes
router.post('/products', upload.single('product_image'), productController.addProduct);
router.put('/products/:id', upload.single('product_image'), productController.editProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
