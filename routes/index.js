const express = require('express');
const router = express.Router();
const authRoutes = require('../routes/authRoutes');
const usersRoutes = require('../routes/userRoute');
const productsRoutes = require('../routes/productsRoute');
router.use('/', authRoutes);
router.use('/', usersRoutes);
router.use('/', productsRoutes);

module.exports = router;