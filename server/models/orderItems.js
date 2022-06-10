const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: ObjectId,
        ref: "Product",
        required: true
    }
})

module.exports = mongoose.model("OrderItems", orderItemSchema);