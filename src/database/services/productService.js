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

    create: async function(userData) {
      let { Title, Cover, Description } = userData;

      const newBook = await db.Book.create({
            title: Title,
            cover: Cover,
            description: Description,
      });
      return newBook;
    },

    update: async function(id, newData) {
      try {
        let book = await db.Book.findByPk(id);
  
        book.title = newData.title;
        book.cover = newData.cover;
        book.description = newData.description;
  
        await book.save();
  
        return book;
      } catch (error) {
          console.log(error);
          return ([]);
      }
    },

    delete: async function (bookId) {

      await db.Book.destroy({ 
          where: { id: bookId } 
      });                       
    },
    
}

module.exports = productService;