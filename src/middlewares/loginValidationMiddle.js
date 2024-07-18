function userLoggedValidation(req, res, next) {
    if(req.session.userLogged){
        return res.redirect('/');
    }
    next();
}

module.exports = userLoggedValidation;