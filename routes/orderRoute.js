const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { orderconfirm, showOrder, updateOrder, getOrderBySellerId, } = require('../controllers/orderController');
const sellerChecker = require('../middlewares/sellerChecker');
const router = express.Router();

router.post('/order', authMiddleware, orderconfirm);
router.get('/orders', authMiddleware, showOrder);
router.get('/order', authMiddleware, sellerChecker, getOrderBySellerId);
router.put('/order', authMiddleware, updateOrder)
module.exports = router;