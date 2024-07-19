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
            res.status(500).send('Internal Server Error');
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
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
        
    },

    edit: async function(req, res) {
        
        try {
            let bookId = req.params.id;
            let book = await productService.getById(bookId);
            
            let author = await book.getAuthors();

            res.render('editBook', { 
                book,
                author: author[0] || {}, 
                errores: {}, 
                oldData: book
            });

        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },
    
    update: async function(req, res) {
        
        const errors = validationResult(req);
        const oldData = req.body || {};

        if (!errors.isEmpty()) {
            
            let bookId = req.params.id;
            let book = await productService.getById(bookId);
            let author = await productService.getAuthorByBookId(bookId);

            return res.render('editBook', { 
                book,
                author: author || {}, 
                errores: errors.mapped(), 
                oldData 
            });
        }

        let bookId = req.params.id;
        let { title, cover, description, authorName, authorCountry } = req.body;
        
        try {
            await productService.update(bookId, { title, cover, description, authorName, authorCountry});
            return res.redirect(`/books/detail/${bookId}`);
        } catch (error) {
            console.log(error);
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