const Sequelize = require('sequelize');

const sequelize = new Sequelize('pessoal', 'root', 'Inteligencia@49509957', {
    dialect: 'mysql',
    storage: './db/app.db'
});

module.exports = sequelize