const Sequelize = require('sequelize');
const db = require('../db/connection');

const Projeto = db.define('projetos', {
    titulo: {
        type: Sequelize.TEXT,
    },
    descricao: {
        type: Sequelize.TEXT,
    },
    link: {
        type: Sequelize.TEXT,
    },
    imagem: {
        type: Sequelize.BLOB,
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



module.exports = Projeto

