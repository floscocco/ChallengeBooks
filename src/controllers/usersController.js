const userService = require('../database/services/userService');
const { validationResult } = require('express-validator');

let usersController = {

    register: function (req, res) {
        return res.render('register',{ errores: [], oldData: {} });
    },

    processRegister: async function (req, res) {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('register', { errores: errors.mapped(), oldData: req.body });
        }

        const category = req.body.category;

        let userEmail = await userService.getByField('email', req.body.email);

        if(userEmail) {
            res.render('register', { errores:{email:{ msg: 'Email already registered'}}, oldData: req.body });
        }

        req.body.password  = userService.hashPassword(req.body.password);

        const userData = {
            Name: req.body.name,
            Email: req.body.email,
            Country: req.body.country,
            Pass: req.body.password,
            CategoryId: req.body.category
        };

        const newUser = await userService.createUser(userData);

        if (!newUser) {
            return res.render('register', { errores: { general: { msg: 'Error creating user' } }, oldData: req.body });
        }
            
        return res.redirect('login');
        
    },

    login: function (req, res) {
        return res.render('login',{ errores: [], oldData: {} });
    },

    processLogin: async function (req, res) {

        const errors=  validationResult(req);
     
        if(!errors.isEmpty()){
            return res.render('login', { errores: errors.mapped(), oldData: req.body });
        }

        let userLogin= await userService.getByField('Email', req.body.email);

        if(!userLogin){
            return res.render('login', { errores:{email:{ msg: 'Email not registered'}}, oldData: req.body });
        };
        
        //Verifico contraseña
        let passwordMatch = userService.comparePassword(req.body.password, userLogin.Pass);
 
        if(passwordMatch){

            let userLoginForSession = {...userLogin};
            delete userLoginForSession.Pass;

            req.session.userLogged = userLoginForSession;

            if(req.body.rememberUser){
                res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 30});
            }
   
            return res.redirect('/') 
        } else {
                return res.render('login', { errores:{password:{ msg: 'Incorrect password'}}, oldData: req.body });
        }

    },

    logOut: function(req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },


}

module.exports = usersController;