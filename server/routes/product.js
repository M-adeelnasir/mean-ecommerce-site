const express = require('express');
const router = express.Router();

const { create, update, getProduct, getProducts, deleteProduct, count, getFeaturedProduct } = require("../controllers/product");

const { requireSignin, isAdmin, checkAuth } = require('../middleware/auth')


router.post('/product/create', create)
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', update)
router.delete('/product/:id', deleteProduct)
router.get('/products/count', count)
router.get('/products/featured', getFeaturedProduct)


module.exports = router;