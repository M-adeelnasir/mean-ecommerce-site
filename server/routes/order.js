const express = require('express');
const router = express.Router()

const { checkAuth, requireSignin } = require('../middleware/auth')
const { createOrder } = require('../controllers/orders')

router.post('/create/order', createOrder);

module.exports = router