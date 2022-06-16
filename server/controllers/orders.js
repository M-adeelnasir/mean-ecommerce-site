const Order = require('../models/order');
const OrderItems = require('../models/orderItems')

exports.createOrder = async (req, res) => {

    try {

        // console.log(req.body.orderItems);
        const orderItemsIds = Promise.all(req.body.orderItems.map(async (order) => {
            console.log(order);
            let newOrderItem = new OrderItems({
                quantity: order.quantity,
                product: order.product
            })
            newOrderItem = await newOrderItem.save();
            console.log(newOrderItem);
            return newOrderItem._id
        }))
        const newOrderItemResolved = await orderItemsIds


        let order = await new Order({
            orderItems: newOrderItemResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: req.body.totalPrice,
            orderBy: req.body.orderBy,
        })
        order = await order.save();

        if (!order) {
            return res.status(400).json({
                success: false,
                msg: "Order Creation Failed."
            })
        }

        res.status(201).json({
            success: true,
            data: order,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }

}