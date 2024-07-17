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
        const book = await db.Book.findByPk(id, {
        include: [{ model: db.Author, as: 'authors' }]
      });
        return book;
      } catch (error) {
          console.log(error);
          return ([]);
      }
    },

    create: async function(newData) {
      try {
        let newBook = await db.Book.create({
          title: newData.title,
          cover: newData.cover,
          description: newData.description,
        });
    
        return newBook;
      } catch (error) {
          console.log(error);
          return ([]);
      }
    },

    update: async function(id, newData) {
      try {
        let book = await db.Book.findByPk(id, {
          include: [{ model: db.Author, as: 'authors' }]
        });
  
        book.title = newData.title;
        book.cover = newData.cover;
        book.description = newData.description;
  
        await book.save();
  
        return book;
      } catch (error) {
          console.log(error);
          return ([]);
      }
    }
}

module.exports = productService;