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

  getUserById = (id) => {
    return db.user.findOne({
      where: {id: id},
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
}

module.exports = new UserModel();
