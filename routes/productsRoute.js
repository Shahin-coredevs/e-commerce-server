const express = require('express');
const { getProducts, addProduct, getProductsByCategory, getProductsByBrand, getProductsById } = require('../controllers/productsController');
const router = express.Router()

router.post('/products', addProduct);
router.get('/products', getProducts);
router.get('/products/:category', getProductsByCategory);
router.get('/product/:id', getProductsById);
router.get('/products/category/:brand', getProductsByBrand);

module.exports = router