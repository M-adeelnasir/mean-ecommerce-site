const Category = require('../models/category')
const slugify = require('slugify');


exports.createCategory = async (req, res) => {
    try {
        const { name, color, icon } = req.body;
        const category = await Category.create({ name, color, icon })
        if (!category) {
            res.status(500).json({
                success: false,
                error: "Category failed"
            })
        }
        res.status(201).json({
            success: true,
            data: category
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}



exports.getCategory = async (req, res) => {
    try {
        const slug = req.params.slug;
        const category = await Category.findOne({ slug })
        if (!category) {
            res.status(404).json({
                success: false,
                error: "No category Found"
            })
        }
        res.json({
            success: true,
            data: category
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const { name, color, icon } = req.body;
        const slug = req.params.slug;
        const category = await Category.findOneAndUpdate({ slug }, { name, color, icon, slug: slugify(name) }, { new: true, runValidators: true })

        if (!category) {
            res.status(404).json({
                success: false,
                error: "No category Found"
            })
        }
        res.json({
            success: true,
            data: category
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})

        res.json({
            success: true,
            data: categories,
            length: categories.length
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const slug = req.params.slug
        const category = await Category.findOneAndDelete({ slug })
        if (!category) {
            res.status(404).json({
                success: false,
                error: "No category Found"
            })
        }
        res.json({
            success: true,
            msg: "Category deleted Successful"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}