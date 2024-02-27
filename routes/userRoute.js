const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createUser, getUsers, getUserByEmail } = require('../controllers/userController');
const router = express.Router();
router.post('/users', createUser);
router.get('/users', authMiddleware, getUsers);
router.get('/users/:email', authMiddleware, getUserByEmail);

module.exports = router;
