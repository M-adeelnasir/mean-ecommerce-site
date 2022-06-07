const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    numReviews: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    }


}, { timestamps: true })


module.exports = mongoose.model("Product", productSchema)