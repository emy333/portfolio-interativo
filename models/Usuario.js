const Sequelize = require('sequelize');
const db = require('../db/connection');

const Usuario = db.define('usuarios', {
    nome: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.TEXT,
    },
    senha: {
        type: Sequelize.TEXT,
    },
    permissao: {
        type: Sequelize.INTEGER,
    },
    ativo: {
        type: Sequelize.TEXT,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
});



module.exports = Usuario

