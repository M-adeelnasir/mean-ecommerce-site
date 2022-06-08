const User = require('../models/user');


exports.addUser = async (req, res) => {
    try {
        const { name, email, street, zip, password, isAdmin, phone, country, apartment } = req.body

        const isUser = await User.findOne({ email })

        if (isUser) {
            return res.status(400).json({
                success: false,
                msg: "User Already exits with this email"
            })
        }

        const user = await User.create({ name, email, street, zip, password, isAdmin, phone, country, apartment })
        if (!user) {
            return res.status(500).json({
                success: false,
                msg: "User create failed"
            })
        }
        res.json({
            success: true,
            data: user
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById({ _id: id })
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "No user found with this id"
            })
        }
        res.json({
            success: true,
            data: user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({
            data: users
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User Already exits with this email"
            })
        }

        if (!email && !password) {
            return res.status(400).json({
                success: false,
                msg: "Please Enter the email and password"
            })
        }

        const isMatch = user.matchPassword(password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                msg: "Password and Email does not match"
            })
        }

        res.json({
            success: true,
            data: user,
            msg: "Login successful"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}