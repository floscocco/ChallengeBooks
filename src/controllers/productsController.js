const productService = require ('../database/services/productService');
const authorService = require('../database/services/authorService');
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

        try {
            res.render('createBook', { errores: {}, oldData: {} });
        } catch (error) {
            console.log(error);
            res.send('Error inesperado').status(500);
        }

    },

    createBook: async function(req, res) {
        
        const errors = validationResult(req);
        const oldData = req.body || {};

        if (!errors.isEmpty()) {
            return res.render('createBook', { errores: errors.mapped(), oldData });
        }
        
        const userData = {
            Title: req.body.title,
            Cover: req.body.cover,
            Description: req.body.description,
            AuthorName: req.body.authorName,
            AuthorCountry: req.body.authorCountry
        };
        
        try {
            let author = await authorService.findOrCreate(userData.AuthorName, userData.AuthorCountry);
            const newBook = await productService.create(userData);
            await productService.associateAuthor(newBook.id, author.id);

            res.redirect(`/books/detail/${newBook.id}`);
        } catch (error) {
            console.error('Error en createBook:', error);
            res.status(500).send('Internal Server Error');
        }
        
    },

    edit: async function(req, res) {
        
        try {
            let bookId = req.params.id;
            let book = await productService.getById(bookId);

            res.render('editBook', { 
                book, 
                errores: {}, 
                oldData: book
            });
            console.log("EL LIBRO ES " + book);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    
    update: async function(req, res) {
        
        const errors = validationResult(req);
        const oldData = req.body || {};

        if (!errors.isEmpty()) {
            
            let bookId = req.params.id;
            let book = await productService.getById(bookId);

            return res.render('editBook', { 
                book, 
                errores: errors.mapped(), 
                oldData 
            });
        }

        let bookId = req.params.id;
        let { title, cover, description } = req.body;
        
        try {
            await productService.update(bookId, { title, cover, description });
            return res.redirect(`/books/detail/${bookId}`);
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }

    },

    delete: async function(req, res) {

        let bookId = req.params.id;
        await productService.delete(bookId);
        res.redirect('/');

    },

};

module.exports = productsController;