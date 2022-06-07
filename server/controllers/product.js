const Product = require('../models/product')


exports.create = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        if (!product) {
            res.status(400).json({
                success: false,
                error: " Product created failed"
            })
        }
        res.status(201).json({
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



exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById({ _id: id })
        if (!product) {
            res.status(404).json({
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
        const products = await Product.find({})
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
            res.status(404).json({
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
            res.status(404).json({
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