"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game_history.belongsTo(models.user, {
        foreignKey: "player1Id",
        as: "player1",
      });
      game_history.belongsTo(models.user, {
        foreignKey: "player2Id",
        as: "player2",
      });
    }
  }
  game_history.init(
    {
      roomName: DataTypes.STRING,
      player1Id: DataTypes.INTEGER,
      player1Choice: DataTypes.STRING,
      resultPlayer1: DataTypes.STRING,
      player2Id: DataTypes.INTEGER,
      player2Choice: DataTypes.STRING,
      resultPlayer2: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "game_history",
    }
  );
  return game_history;
};
