const express = require('express');
const router = express.Router();

const { create, update, getProduct, getProducts, deleteProduct, count, getFeaturedProduct } = require("../controllers/product");

const { requireSignin, isAdmin, checkAuth } = require('../middleware/auth')


router.post('/product/create', requireSignin, checkAuth, isAdmin, create)
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', requireSignin, checkAuth, isAdmin, update)
router.delete('/product/:id', requireSignin, checkAuth, isAdmin, deleteProduct)
router.get('/products/count', requireSignin, checkAuth, isAdmin, count)
router.get('/products/featured', getFeaturedProduct)


module.exports = router;