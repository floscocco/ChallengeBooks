const express = require('express');
const routes = express.Router();

const usersController = require('../controllers/usersController');

const validacionesLogin = require('../middlewares/loginMiddle');

//Registro
routes.get("/register", usersController.register);

routes.post("/register", usersController.processRegister);

//Logueo
routes.get("/login", usersController.login); 

routes.post("/login", validacionesLogin, usersController.processLogin); 

//LogOut
routes.get("/logout", usersController.logOut);


module.exports = routes;