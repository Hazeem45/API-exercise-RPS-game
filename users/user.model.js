const md5 = require("md5");
const db = require("../db/models");
const {Op} = require("sequelize");

class UserModel {
  getExistingUsername = (username) => {
    return db.user.findOne({
      where: {username},
    });
  };

  getExistingEmail = (email) => {
    return db.user.findOne({
      where: {email},
    });
  };

  addUser = (username, email, password) => {
    db.user.create({
      username,
      email,
      password: md5(password),
    });
  };

  getExistingUser = (email, password) => {
    return db.user.findOne({
      where: {
        [Op.and]: [{email}, {password: md5(password)}],
      },
      attributes: {
        exclude: ["password", "email"],
      },
      raw: true,
    });
  };

  getExistingPassword = (password) => {
    return db.user.findOne({
      where: {password: md5(password)},
    });
  };

  getAllUsers = () => {
    return db.user.findAll({
      attributes: {
        exclude: ["email", "password", "createdAt", "updatedAt"],
      },
    });
  };

  getUserById = (id) => {
    return db.user.findOne({
      where: {id: id},
      attributes: {
        exclude: ["password", "updatedAt"],
      },
      include: [
        {
          model: db.user_biodata,
          attributes: ["fullname", "pronouns", "address"],
        },
      ],
    });
  };

  getUserIdBio = (id) => {
    return db.user_biodata.findOne({
      where: {userId: id},
    });
  };

  updateUserBiodata = (fullname, pronouns, address, id) => {
    return db.user_biodata.update(
      {
        fullname,
        pronouns,
        address,
      },
      {
        where: {userId: id},
      }
    );
  };

  createUserBiodata = (fullname, pronouns, address, id) => {
    db.user_biodata.create({
      fullname,
      pronouns,
      address,
      userId: id,
    });
  };

  createGameRoom = (roomName, userId, player1Choice) => {
    db.game_history.create({
      roomName,
      player1Id: userId,
      player1Choice,
    });
  };

  getAllRooms = () => {
    return db.game_history.findAll({
      attributes: {
        exclude: ["player1Id", "player1Choice", "resultPlayer1", "player2Id", "player2Choice", "resultPlayer2", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: db.user,
          as: "player1",
          attributes: {exclude: ["id", "password", "email", "createdAt", "updatedAt"]},
        },
        {
          model: db.user,
          as: "player2",
          attributes: {exclude: ["id", "password", "email", "createdAt", "updatedAt"]},
        },
      ],
    });
  };

  getRoomDetails = (roomId) => {
    return db.game_history.findOne({
      where: {id: roomId},
      attributes: {
        exclude: ["player1Id", "player2Id", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: db.user,
          as: "player1",
          attributes: ["id", "username"],
        },
        {
          model: db.user,
          as: "player2",
          attributes: ["id", "username"],
        },
      ],
    });
  };

  updateGameRoom = (roomId, resultP1, player2Id, player2Choice, resultP2) => {
    db.game_history.update(
      {
        resultPlayer1: resultP1,
        player2Choice,
        player2Id,
        resultPlayer2: resultP2,
      },
      {
        where: {id: roomId},
      }
    );
  };

  getRoomFinished = (userId) => {
    return db.game_history.findAll({
      where: {
        [Op.or]: [{player1Id: userId}, {player2Id: userId}],
        [Op.and]: [{resultPlayer1: {[Op.ne]: null}}, {resultPlayer2: {[Op.ne]: null}}],
      },
      attributes: {
        exclude: ["createdAt"],
      },
      include: [
        {
          model: db.user,
          as: "player1",
          attributes: {exclude: ["password", "email", "createdAt", "updatedAt"]},
        },
        {
          model: db.user,
          as: "player2",
          attributes: {exclude: ["password", "email", "createdAt", "updatedAt"]},
        },
      ],
      raw: true,
    });
  };
}

module.exports = new UserModel();
