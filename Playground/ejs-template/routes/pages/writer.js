var express = require('express');
var router = express.Router();
var path = require('path')

// var multer  =   require('multer');
var fs = require('fs')
// var path = require('path')
// var crypto = require('crypto');


// var storage = multer.diskStorage({
//     destination: 'images/writer',
//     filename: function (req, file, cb) {
//         crypto.pseudoRandomBytes(16, function (err, raw) {
//             if (err) return cb(err)
//             cb(null, Date.now() + file.originalname)
//         })
//     }
// })
// var upload = multer({ storage: storage });

//show ckeditor to home
// router.get('/', function (req, res) {
//     var title = "Plugin Imagebrowser ckeditor for nodejs"
//     res.render('index', { result: 'result' })
// })

router.get('/files', function (req, res) {
    const pathImages = path.join(__dirname, '../../public/images/writer');
    console.log(pathImages);
    
    const images = fs.readdirSync(pathImages);
    var sorted = []
    for (let item of images) {
        if (item.split('.').pop() === 'png'
            || item.split('.').pop() === 'jpg'
            || item.split('.').pop() === 'jpeg'
            || item.split('.').pop() === 'svg') {
            var abc = {
                "image": "/images/writer/" + item,
                "folder": '/'
            }
            sorted.push(abc)
        }
    }
    res.send(sorted);
})

// router.post('/upload', upload.array('flFileUpload', 12), function (req, res, next) {
//     res.redirect('back')
// });

router.post('/delete_file', function (req, res, next) {
    var url_del = 'public' + req.body.url_del
    console.log(url_del)
    if (fs.existsSync(url_del)) {
        fs.unlinkSync(url_del)
    }
    res.redirect('back')
});

router.get('/add-new-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Add new post',
            layout: 'layouts/addnewpost',
            srcScript: '/javascripts/writer/addnewpost.js'
        }
    );
});

router.get('/approved-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Approved Post',
            layout: 'layouts/approvedpost',
            srcScript: ''
        }
    );
});

router.get('/denied-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Denied Post',
            layout: 'layouts/deniedpost',
            srcScript: ''
        }
    );
});
router.get('/published-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Published Post',
            layout: 'layouts/publishedpost',
            srcScript: ''
        }
    );
});

router.get('/unapproved-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Unapproved Post',
            layout: 'layouts/unapprovedpost',
            srcScript: ''
        }
    );
});

module.exports = router;