const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({

    orderItems: [{
        type: ObjectId,
        ref: "OrderItems",
        required: true
    }],
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    totalPrice: {
        type: Number,
    },

    orderBy: {
        type: ObjectId,
        ref: "User",
    }

})

module.exports = mongoose.model("Order", orderSchema)