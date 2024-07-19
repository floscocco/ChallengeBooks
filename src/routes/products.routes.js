const express = require('express');
const routes = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController');

const validateBook = require('../middlewares/createBookMiddle');

//Crear Libro
routes.get('/create', productsController.create);
routes.post('/create', validateBook, productsController.createBook);

//Detalle Libro
routes.get('/detail/:id', productsController.detail);

//Editar Libro
routes.get('/edit/:id', productsController.edit);
routes.put('/edit/:id', validateBook, productsController.update);

//Borrar Libro
routes.delete('/:id', productsController.delete);


module.exports = routes;