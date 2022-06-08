const express = require('express');
const router = express.Router();

const { addUser, getUser, getAllUsers, login } = require('../controllers/auth')

router.post('/user/add', addUser)
router.get('/user/:id', getUser)
router.get('/users', getAllUsers)
router.post('/login', login)

module.exports = router