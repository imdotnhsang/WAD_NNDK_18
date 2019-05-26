var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log(req.user);
  
  if (req.user) {
    res.redirect('/home')
  } else {
    res.render(
      'auth',
      {
        title: 'Sign In',
        layout: 'layouts/user',
        srcScript: '/javascripts/auth/index.js',
        hrefCss: '/stylesheets/guest-subscriber/auth.css'
      }
    );
  }
});

router.get('/forgotten-password', (req, res) => {
  res.render(
    'auth',
    {
      title: 'Forgotten Password',
      layout: 'layouts/forgottenPassword',
      srcScript: '/javascripts/auth/index.js',
      hrefCss: '/stylesheets/guest-subscriber/auth.css'
    }
  );
});

// router.get('/activation', (req, res) => {
//   res.render(
//     'auth',
//     {
//       title: 'Activation',
//       layout: 'layouts/activation',
//       srcScript: '/javascripts/auth/index.js',
//       hrefCss: '/stylesheets/guest-subscriber/auth.css'
//     }
//   );
// });

router.get('/logout', function (req, res, next) {
  req.logOut();
  res.redirect('/auth');
});

module.exports = router;