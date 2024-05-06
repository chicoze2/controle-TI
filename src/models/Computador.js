const Sequelize = require('sequelize');
const database = require('../db/init.js');

const Empresa = require('./Empresa');

const Computador = database.define('computadores', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },

    // Adicionando a chave estrangeira para a tabela Empresa
    empresaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Empresa,
            key: 'id'
        }
    }
});

Computador.belongsTo(Empresa, { foreignKey: 'empresaId', as: 'empresa' })

module.exports = Computador;
