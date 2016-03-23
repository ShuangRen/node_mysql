"use strict";
var M = require('./../model/M');
exports.login = function (req, res, next) {
    M('user').where('name="' + req.body.username + '"').find(function(rows) {
        if(rows['pwd'] == req.body.password) {
            req.session.user = req.body.username;
            console.log(req.session.user)
            //res.redirect('/admin/');
            res.render('/admin/');
        }else {
            next();
        }
    });
};