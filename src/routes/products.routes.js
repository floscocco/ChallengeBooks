const express = require('express');
const routes = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController');


routes.get('/detail/:id', productsController.detail);

routes.get('/create', productsController.create);
routes.post('/create', productsController.createBook);

routes.get('/edit/:id', productsController.edit);
routes.put('/edit/:id', productsController.update);

module.exports = routes;