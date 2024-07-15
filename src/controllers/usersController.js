const userService = require('../database/services/userService');

let usersController = {

    register: function (req, res) {
        return res.render('register',{ errores: [], oldData: {} });
    },

    login: function (req, res) {
        return res.render('login',{ errores: [], oldData: {} });
    },



}

module.exports = usersController;