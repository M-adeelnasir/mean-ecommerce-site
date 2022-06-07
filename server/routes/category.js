const express = require('express');
const router = express.Router();

const { createCategory, getCategory, updateCategory, getCategories, deleteCategory } = require('../controllers/category')

router.post('/category/create', createCategory)
router.get('/category/:slug', getCategory)
router.put('/category/:slug', updateCategory)
router.get('/categories', getCategories)
router.delete('/category/:slug', deleteCategory)

module.exports = router