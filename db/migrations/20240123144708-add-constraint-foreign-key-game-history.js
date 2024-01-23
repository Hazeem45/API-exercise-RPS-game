"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("game_histories", {
      type: "foreign key",
      fields: ["player1Id"],
      references: {
        table: "users",
        field: "id",
      },
    });
    await queryInterface.addConstraint("game_histories", {
      type: "foreign key",
      fields: ["player2Id"],
      references: {
        table: "users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
