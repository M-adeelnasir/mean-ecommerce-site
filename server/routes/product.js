const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');


//single file uploads

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // cb(null, '/public/uploads')
        let isValid = FILE_TYPE_MAP[file.mimetype]
        let validationError = null
        if (!isValid) {
            validationError = new Error("Invalid File Type")
        }
        let path = `./public/uploads`;
        fs.promises.mkdir(path, { recursive: true });
        callback(validationError, path);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(' ', '-')
        const uniqueName = Date.now()
        cb(null, + uniqueName + '-' + fileName)
    }
})
const upload = multer({ storage: storage })






const { create, update, getProduct, getProducts, deleteProduct, count, getFeaturedProduct } = require("../controllers/product");

const { requireSignin, isAdmin, checkAuth } = require('../middleware/auth')


router.post('/product/create', upload.single('image'), create)
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', update)
router.delete('/product/:id', deleteProduct)
router.get('/products/count', count)
router.get('/products/featured', getFeaturedProduct)


module.exports = router;