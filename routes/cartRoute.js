const express = require('express');
const { addToCart, cartProducts, deleteFromCart, cartUpdate } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const userChecker = require('../middlewares/userchecker');
const router = express.Router();

router.post('/cart', authMiddleware, userChecker, addToCart);
router.put('/cart/update', authMiddleware, userChecker, cartUpdate);
router.get('/cart/:id', authMiddleware, userChecker, cartProducts);
router.delete('/cart', authMiddleware, userChecker, deleteFromCart)
module.exports = router;