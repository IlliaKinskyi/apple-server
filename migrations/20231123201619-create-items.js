'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      vendor_code: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING(2048),
      },
      images: {
        type: Sequelize.STRING(2048),
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      bestsellers: {
        type: Sequelize.BOOLEAN,
      },
      new: {
        type: Sequelize.BOOLEAN,
      },
      popularity: {
        type: Sequelize.INTEGER,
      },
      diagonal: {
        type: Sequelize.INTEGER,
      },
      cpu: {
        type: Sequelize.STRING,
      },
      cores: {
        type: Sequelize.INTEGER,
      },
      main_camera: {
        type: Sequelize.INTEGER,
      },
      front_camera: {
        type: Sequelize.INTEGER,
      },
      battery: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  },
};
