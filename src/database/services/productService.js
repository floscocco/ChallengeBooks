const path = require('path');

let db = require('../models');

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
    },
    getById: async function(id) {
        try {
          return await db.Book.findByPk(id, {
            include: [{ model: db.Author, as: 'authors' }]
          });
        } catch (error) {
          console.log(error);
          return ([]);
        }
      }
}

module.exports = productService;