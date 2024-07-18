const express = require('express');
const routes = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController');

const validateBook = require('../middlewares/createBookMiddle');

routes.get('/detail/:id', productsController.detail);

routes.get('/create', productsController.create);
routes.post('/create', validateBook, productsController.createBook);

routes.get('/edit/:id', productsController.edit);
routes.put('/edit/:id', validateBook, productsController.update);

routes.delete('/:id', productsController.delete);

module.exports = routes;