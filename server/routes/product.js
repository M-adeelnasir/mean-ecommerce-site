const express = require('express');
const router = express.Router();
const upload = require('../utiles/helper');


const { create, update, getProduct, getProducts, deleteProduct, count, getFeaturedProduct, galleryImages } = require("../controllers/product");

const { requireSignin, isAdmin, checkAuth } = require('../middleware/auth')

router.post('/product/create', requireSignin, isAdmin, upload.single('image'), create)
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', requireSignin, isAdmin, update)
router.delete('/product/:id', requireSignin, isAdmin, deleteProduct)
router.get('/products/count', requireSignin, isAdmin, count)
router.get('/products/featured', getFeaturedProduct)
router.put('/product/gallery-images/:productId', requireSignin, isAdmin, upload.array('images', 4), galleryImages)


module.exports = router;