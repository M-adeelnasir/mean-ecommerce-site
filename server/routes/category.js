const express = require('express');
const router = express.Router();

const { createCategory, getCategory, updateCategory, getCategories, deleteCategory } = require('../controllers/category')

const { requireSignin, isAdmin, checkAuth } = require('../middleware/auth')

router.post('/category/create', requireSignin, isAdmin, checkAuth, createCategory)
router.get('/category/:slug', getCategory)
router.put('/category/:slug', requireSignin, isAdmin, checkAuth, updateCategory)
router.get('/categories', getCategories)
router.delete('/category/:slug', requireSignin, isAdmin, checkAuth, deleteCategory)

module.exports = router