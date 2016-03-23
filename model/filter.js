exports.authorize = function(req, res, next) {
  if (!req.session.user_id) {
    console.log(123)
    res.redirect('/admin/login');
  } else {
    next();
  }
}
