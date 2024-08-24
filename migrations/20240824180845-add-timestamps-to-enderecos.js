'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('enderecos', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('enderecos', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('enderecos', 'createdAt');
    await queryInterface.removeColumn('enderecos', 'updatedAt');
  }
};
