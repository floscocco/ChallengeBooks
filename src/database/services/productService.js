const path = require('path');

let db = require('../models');
const { Op } = require('sequelize');

let productService = {

    getAll: async function() {
        try {
            return await db.Book.findAll({
                include: [{ model: db.Author, as: 'authors'}]
            })
        } catch (error) {
            console.log(error);
            return([]);
        }
    }
}

module.exports = productService;