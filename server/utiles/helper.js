const fs = require('fs');
const multer = require('multer');

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

module.exports = upload