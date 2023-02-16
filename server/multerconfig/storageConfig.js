const multer = require("multer");



//storage config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null, filename)
    }
});

//filter
const filefilter = (req, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        callback(null, true)
    } else {
        callback(null, false)
        return (new Error("Only .png/.jpg/.jpeg"))
    }
}


const upload = multer({
    storage: storage,
    fileFilter: filefilter
});

module.exports = upload;