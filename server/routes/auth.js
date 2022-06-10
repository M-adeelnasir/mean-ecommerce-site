const express = require('express');
const router = express.Router();

const { addUser, getUser, getAllUsers, login } = require('../controllers/auth')
const { requireSignin, isAdmin, checkAuth } = require('../middleware/auth')

router.post('/user/add', addUser)
router.get('/user/:id', requireSignin, isAdmin, checkAuth, getUser)
router.get('/users', requireSignin, isAdmin, checkAuth, getAllUsers)
router.post('/login', login)

module.exports = router