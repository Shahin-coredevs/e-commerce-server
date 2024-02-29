const express = require('express');
const router = express.Router();
const { login, logout, me } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleChecker = require('../middlewares/sellerChecker');

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);

module.exports = router;