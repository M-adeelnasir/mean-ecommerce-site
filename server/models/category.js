const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category Name is required"],
        unique: true
    },
    color: {
        type: String,
        required: true
    }
    ,
    icon: {
        type: String
    },
    slug: {
        type: String,
        unique: true,
        index: true
    }
}, { timestamps: true })


categorySchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})


module.exports = mongoose.model('Category', categorySchema)