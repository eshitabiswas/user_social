const Sequelize = require('sequelize');

const sequelize = new Sequelize('user_social', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});


module.exports = sequelize;