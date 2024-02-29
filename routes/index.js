const express = require('express');
const router = express.Router();
const authRoutes = require('../routes/authRoutes');
const usersRoutes = require('../routes/userRoute');
const productsRoutes = require('../routes/productsRoute');
const cartRoutes = require('../routes/cartRoute');
const orderRoute = require('../routes/orderRoute');

router.use('/', authRoutes);
router.use('/', usersRoutes);
router.use('/', productsRoutes);
router.use('/', cartRoutes);
router.use('/', orderRoute);

module.exports = router;