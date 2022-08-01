const express = require('express');
const router = express.Router();

const { createCategory, getCategory, updateCategory, getCategories, deleteCategory } = require('../controllers/category')

const { requireSignin, isAdmin, checkAuth } = require('../middleware/auth')

router.post('/category/create', requireSignin, isAdmin, createCategory)
router.get('/category/:slug', requireSignin, isAdmin, getCategory)
router.put('/category/:slug', requireSignin, isAdmin, updateCategory)
router.get('/categories', requireSignin, getCategories)
router.delete('/category/:slug', requireSignin, isAdmin, deleteCategory)

module.exports = router