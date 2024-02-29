const express = require('express');
const { createUser, getUsers, getUserByEmail } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/signin', createUser);
router.get('/users', authMiddleware, getUsers);
router.get('/users/:email', authMiddleware, getUserByEmail);

module.exports = router;
