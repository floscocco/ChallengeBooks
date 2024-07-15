const express = require('express');
const routes = express.Router();

const usersController = require('../controllers/usersController');


//Registro
routes.get("/register", usersController.register);

//Logueo
routes.get("/login", usersController.login); 



module.exports = routes;