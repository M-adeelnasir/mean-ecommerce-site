const express = require('express');
const router = express.Router()

const { checkAuth, requireSignin } = require('../middleware/auth')
const { createOrder, orders } = require('../controllers/orders')

router.post('/create/order', createOrder);
router.get('/orders', orders);

module.exports = router