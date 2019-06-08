var express = require('express');
var router = express.Router();
// var path = require('path');
// var fs = require('fs');

// router.get('/files', function (req, res) {
//     const pathImages = path.join(__dirname, '../../public/images/writer');
//     console.log(pathImages);

//     const images = fs.readdirSync(pathImages);
//     var sorted = []
//     for (let item of images) {
//         if (item.split('.').pop() === 'png'
//             || item.split('.').pop() === 'jpg'
//             || item.split('.').pop() === 'jpeg'
//             || item.split('.').pop() === 'svg') {
//             var abc = {
//                 "image": "/images/writer/" + item,
//                 "folder": '/'
//             }
//             sorted.push(abc)
//         }
//     }
//     res.send(sorted);
// });

// router.post('/delete_file', function (req, res, next) {
//     var url_del = 'public' + req.body.url_del
//     console.log(url_del)
//     if (fs.existsSync(url_del)) {
//         fs.unlinkSync(url_del)
//     }
//     res.redirect('back')
// });

router.get('/edit-post', async function (req, res, next) {
    res.render(
        'editor',
        {
            title: 'Edit Post',
            layout: 'layouts/addnewpost',
            srcScript: '/javascripts/writer/addnewpost.js'
        }
    );
});

router.get('/posts-approved', function (req, res, next) {
    res.render(
        'editor',
        {
            title: 'Posts Approved',
            layout: 'layouts/postsApproved',
            srcScript: ''
        }
    );
});

router.get('/posts-denied', function (req, res, next) {
    res.render(
        'editor',
        {
            title: 'Posts Denied',
            layout: 'layouts/postsDenied',
            srcScript: ''
        }
    );
});
router.get('/posts-published', function (req, res, next) {
    res.render(
        'editor',
        {
            title: 'Posts Published',
            layout: 'layouts/postsPublished',
            srcScript: ''
        }
    );
});

router.get('/posts-unapproved', function (req, res, next) {
    res.render(
        'editor',
        {
            title: 'Posts Unapproved',
            layout: 'layouts/postsUnapproved',
            srcScript: ''
        }
    );
});

module.exports = router;