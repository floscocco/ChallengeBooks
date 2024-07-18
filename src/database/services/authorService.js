let db = require('../models');

let authorService = {
    
    findOrCreate: async function(name, country) {
        let author = await db.Author.findOne({ where: { name, country } });

        if (!author) {
            author = await db.Author.create({ name, country });
        }

        return author;
    }
};

module.exports = authorService;