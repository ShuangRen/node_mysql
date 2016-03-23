const express = require('express');
const router = express.Router();
const login = require('../controller/login');
/* GET users listing. */
router.get('/', function(req, res, next) {
    authorize(req, res, next);
  res.render('Admin/index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('Admin/login');
}).post('/login', function (req, res, next) {
    //console.log(123)
    login.login(req, res, next);
});


function authorize (req, res, next) {
   //console.log(req.session)
    if(!req.session) {
        res.redirect('/admin/login');
    }else {
        if (!req.session.user) {
            res.redirect('/admin/login');
        } else {
            next();
        }
    }
}


module.exports = router;
