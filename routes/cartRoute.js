const express = require('express');
const { addToCart, cartProducts, deleteFromCart, cartUpdate } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/cart', authMiddleware, addToCart);
router.put('/cart/update', authMiddleware, cartUpdate);
router.get('/cart/:id', authMiddleware, cartProducts);
router.delete('/cart', authMiddleware, deleteFromCart)
module.exports = router;