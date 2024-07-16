const db = require('../models');
const bcryptjs= require('bcryptjs');

let userService = {

    getByField: async function(field,value) {
        const user = await db.User.find({ where: { [field]: value } });
        return user;       
    },

    createUser: async function(userData) {
        const newUser = await db.User.create(userData);
        return newUser;
    },

    hashPassword: function(password){
        return bcryptjs.hashSync( password, 10);
    },

    comparePassword: function(inputPassword, userPassword){
        return bcryptjs.compareSync(inputPassword, userPassword);
    },

}


module.exports = userService;