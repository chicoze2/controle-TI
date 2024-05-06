const Sequelize = require('sequelize');
const database = require('../db/init.js');

const Empresa = database.define('empresa', {
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
        allowNull: true},

},{timestamps: false
})

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

const Manutencao = database.define("manutencoes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    dataEntrada: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Define o valor padrão como a data e hora atuais
    },
    dataSaida: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  
    // Adicionando a chave estrangeira para a tabela Empresa
    computadorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Computador,
        key: "id",
      },
    },
  });
  
  // Relacionamento entre Manutencao e Computador (muitas manutenções para um computador)
  Manutencao.belongsTo(Computador , { foreignKey: 'computadorId', as: 'computador' });
  

database.sync()
    .then(() => {
        console.log('Computador table created successfully');
    })
    .catch(err => {
        console.error('Error creating Computador table:', err);
    });