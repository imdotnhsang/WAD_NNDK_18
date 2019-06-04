const express = require('express');
const router = express.Router();
const _ = require('lodash');

const mongoose = require('mongoose');
const Article = mongoose.model('Article');

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

const upload = multer({ storage });

router.post('/upload-image', upload.array('flFileUpload', 12), (req, res) => {
    res.redirect('back');
});

router.post('/create', (req, res) => {
    const errors = {};

    let { } = req.body;

    // const accountWriter = req.user;
    // if (!accountWriter || accountWriter.userType !== 'writer') {
    //     errors.article = 'Authorization has failed.';
    //     return res.status(400).json(errors);
    // } 

    
});



module.exports = router;