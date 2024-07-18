module.exports = (sequelize, dataTypes) => {
    let alias = 'BooksAuthors';
    let cols = {
      BookId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'books',
          key: 'id'
        }
      },
      AuthorId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'authors',
          key: 'id'
        }
      }
    };
    let config = {
      tableName: 'BooksAuthors',
      timestamps: false
    };
    const BooksAuthors = sequelize.define(alias, cols, config);
  
    return BooksAuthors;
  };