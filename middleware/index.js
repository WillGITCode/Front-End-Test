let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
if (req.session.currentUser !== undefined && req.session.currentUser !== null) {
        return next();
    }else res.render('login')
}


module.exports = middlewareObj



