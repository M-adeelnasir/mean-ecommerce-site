const express = require('express');
const router = express.Router()

const { checkAuth, requireSignin, isAdmin } = require('../middleware/auth')
const { createOrder, orders, order, updateStatus, deleteOrder, totalSales, orderCount, userOrders } = require('../controllers/orders')

router.post('/create/order', requireSignin, checkAuth, createOrder);
router.get('/orders', requireSignin, checkAuth, orders);
router.get('/order/:id', requireSignin, checkAuth, order);
router.put('/order/:id', requireSignin, checkAuth, updateStatus);
router.delete('/order/:id', requireSignin, checkAuth, deleteOrder);
router.get('/total-sales', requireSignin, isAdmin, totalSales)
router.get('/total-orders', requireSignin, isAdmin, orderCount)
router.get('/user-orders/:orderBy', requireSignin, checkAuth, userOrders)

module.exports = router