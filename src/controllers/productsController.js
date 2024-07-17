const productService = require ('../database/services/productService');

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