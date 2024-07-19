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

      try {
        const newBook = await db.Book.create({
          title: Title,
          cover: Cover,
          description: Description,
      });

        return newBook;

        } catch (error) {
            console.log(error);
            return([]); 
        }
    },

    associateAuthor: async function(bookId, authorId) {
      
      const book = await db.Book.findByPk(bookId);
      if (book) {
          await book.addAuthor(authorId);
      }

    },

    update: async function(id, newData) {
      
      try {
        let book = await db.Book.findByPk(id);

        book.title = newData.title;
        book.cover = newData.cover;
        book.description = newData.description;
  
        await book.save();
        
        let [author, created] = await db.Author.findOrCreate({
          where: { name: newData.authorName },
          defaults: { country: newData.authorCountry }
        });

        if (!created) {
          author.country = newData.authorCountry;
          await author.save();
        }

        await book.setAuthors([author]);
        return book;

      } catch (error) {
          console.log(error);
          return ([]);
      }
    },

    getAuthorByBookId: async function(bookId) {
      
      try {
          let book = await db.Book.findByPk(bookId);
          let authors = await book.getAuthors();
          return authors[0] || {};
      } catch (error) {
          console.log(error);
          return ([]);
      }

    },

    delete: async function (bookId) {

      try {
        await db.BooksAuthors.destroy({
          where: { BookId: bookId }
        });

        await db.Book.destroy({
          where: { id: bookId }
        });
        
        } catch (error) {
            console.log(error);
            return ([]);
        } 

    },
    
}

module.exports = productService;