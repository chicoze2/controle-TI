const Sequelize = require("sequelize");
const database = require("../db/init.js");

const Manutencao = require("./Manutencao");

const ManutencaoItem = database.define("manutencaoItems", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  manutencaoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Manutencao,
      key: "id",
    },

  }

})

// ManutencaoItem.belongsTo(Manutencao, { foreignKey: 'manutencaoId', as: 'manutencao' });
module.exports = ManutencaoItem