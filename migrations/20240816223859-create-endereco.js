'use strict';

const { Sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('enderecos', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },Logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Complemento: {
        type: Sequelize.STRING,
      },
      Bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MunicipioIBGE: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('enderecos');
  }
};
