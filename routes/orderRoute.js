const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { orderconfirm, showOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/order', authMiddleware, orderconfirm);
router.get('/order', authMiddleware, showOrder);
// router.delete('/order', authMiddleware, )
module.exports = router;