const productService = require ('../database/services/productService');

const productsController = {
    home: async (req, res) => {
        let books = await productService.getAll();
        res.render('home', { books });
    },
};

module.exports = productsController;