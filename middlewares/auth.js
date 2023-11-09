const is_login = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash('alertMessage', 'Login terlebih dahulu!')
    req.flash('alertStatus', 'danger')
    res.redirect('/auth/login')
  } else {
    next()
  }
}

module.exports = is_login