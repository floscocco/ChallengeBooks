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

};

module.exports = productsController;