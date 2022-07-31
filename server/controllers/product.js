const Product = require('../models/product')


exports.create = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        if (!product) {
            return res.status(400).json({
                success: false,
                error: " Product created failed"
            })
        }
        res.status(201).json({
            success: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}



exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findById({ _id: id })
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "No product found with this id"
            })
        }
        res.json({
            success: true,
            data: product,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}


exports.getProducts = async (req, res) => {
    try {

        // http://localhost:4000/api/v1/products?categories=993029,2323323

        let filter = {}
        if (req.query.categories) {
            filter = { category: req.query.categories.split(',') }
        }

        const products = await Product.find(filter).populate('category')
        res.json({
            success: true,
            data: products,
            length: products.length,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}


exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate({ _id: id }, (req.body), { new: true, runValidators: true })
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "No product found with this id"
            })
        }
        res.json({
            success: true,
            data: product,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {

        const id = req.params.id;
        const product = await Product.findByIdAndDelete({ _id: id })
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "No product found with this id"
            })
        }

        res.json({
            success: true,
            msg: "Product deleted succcesful"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}


exports.count = async (req, res) => {
    try {
        const count = await Product.countDocuments()

        res.status(200).json({
            count: count
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}

exports.getFeaturedProduct = async (req, res) => {
    try {

        const products = await Product.find({ isFeatured: true })
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No product found"
            })
        }
        res.status(200).json({
            data: product,
            success: true
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}