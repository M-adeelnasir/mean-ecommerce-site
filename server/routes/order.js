const express = require('express');
const router = express.Router()

const { checkAuth, requireSignin } = require('../middleware/auth')
const { createOrder, orders, order, updateStatus, deleteOrder, totalSales } = require('../controllers/orders')

router.post('/create/order', createOrder);
router.get('/orders', orders);
router.get('/order/:id', order);
router.put('/order/:id', updateStatus);
router.delete('/order/:id', deleteOrder);
router.get('/total-sales', totalSales)

module.exports = router