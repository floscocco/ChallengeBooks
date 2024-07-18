const express = require('express');
const routes = express.Router();

const usersController = require('../controllers/usersController');

const validateRegister = require('../middlewares/registerMiddle');
const validateLogin = require('../middlewares/loginMiddle');

const userLoggedValidation = require('../middlewares/loginValidationMiddle');

//Registro
routes.get("/register", userLoggedValidation, usersController.register);

routes.post("/register", validateRegister, usersController.processRegister);

//Logueo
routes.get("/login", userLoggedValidation, usersController.login); 

routes.post("/login", validateLogin, usersController.processLogin); 

//LogOut
routes.get("/logout", usersController.logOut);


module.exports = routes;