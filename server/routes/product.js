const express = require('express');
const router = express.Router();

const { create, update, getProduct, getProducts, deleteProduct } = require("../controllers/product")

router.post('/product/create', create)
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', update)
router.delete('/product/:id', deleteProduct)

module.exports = router;