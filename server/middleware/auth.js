const expressjwt = require("express-jwt");
const User = require('../models/user')

exports.requireSignin = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['sha1', 'RS256', 'HS256'] })

exports.checkAuth = async (req, res, next) => {
    // console.log("USER===>", req.user);
    try {
        const userId = req.user.id;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                data: "User Not found"
            })
        }
        req.profile = user;
        next()
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            data: "Authentication failed"
        })
    }
}


exports.isAdmin = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const user = await User.findById({ _id: userId })
        if (user.isAdmin !== true) {
            return res.status(404).json({
                success: false,
                data: "This user is not an admin"
            })
        }

        req.profile = user;
        next();

    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            data: "Authentication failed"
        })
    }
}