const productService = require ('../database/services/productService');
const { validationResult } = require('express-validator');

const productsController = {
    home: async (req, res) => {
        let books = await productService.getAll();
        res.render('home', { books });
    },

    detail: async function(req, res) {
        
        let bookId = req.params.id;
        let book = await productService.getById(bookId);
        res.render('bookDetail', { book });
        
    },

    create: async function(req, res) {

        res.render('createBook');

    },

    createBook: async function(req, res) {
        
        console.log('MI TITULO ES: ' + req.body.title)
        console.log('MI COVER ES: ' + req.body.cover)
        console.log('MI DESCRIPCION ES: ' + req.body.description)
        const userData = {
            Title: req.body.title,
            Cover: req.body.cover,
            Description: req.body.description
            
        };

        const newBook =await productService.create(userData);
        console.log('CREE NUEVO LIBRO: ' + newBook)
        res.redirect(`/books/detail/${newBook.id}`);
        
    },

    edit: async function(req, res) {
        
        let bookId = req.params.id;
        let book = await productService.getById(bookId);
        res.render('editBook', { book });
    
    },
    
    update: async function(req, res) {
        
        let bookId = req.params.id;
        let { title, cover, description } = req.body;
        await productService.update(bookId, { title, cover, description });
        res.redirect(`/books/detail/${bookId}`);
    },

};

module.exports = productsController;