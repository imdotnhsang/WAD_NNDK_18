const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const destAvatar = path.join(__dirname, '../../public/images/writer/');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destAvatar);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage
});

router.post('/upload-image', upload.array('flFileUpload', 12), (req, res) => {
    res.redirect('back');
})

module.exports = router;