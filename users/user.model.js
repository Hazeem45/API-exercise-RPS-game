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
    });
  };

  getExistingPassword = (password) => {
    return db.user.findOne({
      where: {password: md5(password)},
    });
  };

  getAllUsers = () => {
    return db.user.findAll();
  };
}

module.exports = new UserModel();
