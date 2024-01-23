'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomName: {
        type: Sequelize.STRING
      },
      player1Id: {
        type: Sequelize.INTEGER
      },
      player1Choice: {
        type: Sequelize.STRING
      },
      resultPlayer1: {
        type: Sequelize.STRING
      },
      player2Id: {
        type: Sequelize.INTEGER
      },
      player2Choice: {
        type: Sequelize.STRING
      },
      resultPlayer2: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('game_histories');
  }
};