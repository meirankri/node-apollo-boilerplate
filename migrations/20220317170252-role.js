'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Role', {
      roleId: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.DataTypes.STRING,
      description: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Role');
  },
};
