const express = require('express');
const routes = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController');


routes.get('/detail/:id', productsController.detail);


module.exports = routes;