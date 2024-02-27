const express = require('express');
const { addToCart, cartProducts, deleteFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/cart', authMiddleware, addToCart);
router.get('/cart/:email', authMiddleware, cartProducts);
router.delete('/cart/:id', authMiddleware, deleteFromCart)
module.exports = router;