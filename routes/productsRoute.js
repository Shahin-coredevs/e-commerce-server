const express = require('express');
const { getProducts, addProduct, getProductsByCategory, getProductsByBrand, getProductsById } = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');
const sellerChecker = require('../middlewares/sellerChecker');

const router = express.Router()

router.post('/products', authMiddleware, sellerChecker, addProduct);
router.get('/products', getProducts);
router.get('/products/:category', getProductsByCategory);
router.get('/product/:id', getProductsById);
router.get('/products/category/:brand', getProductsByBrand);

module.exports = router