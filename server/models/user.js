const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    street: {
        type: String
    },
    apartment: String,
    city: String,
    zip: String,
    country: String,
    phone: Number,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getJwtToken = async function () {
    return jwt.sign(
        {
            id: this._id, isAdmin: this.isAdmin
        }
        , process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
        }
    )
}

module.exports = mongoose.model("User", userSchema)

