const userModel = require("./user.model");
const jwt = require("jsonwebtoken");

class UserController {
  registerNewUser = async (req, res) => {
    const {username, email, password} = req.body;
    if (username === undefined || username === "") {
      return res.json({message: "enter username!"});
    } else if (email === undefined || email === "") {
      return res.json({message: "enter email address!"});
    } else if (password === undefined || password === "") {
      return res.json({message: "enter password at least 6 character!"});
    }

    const usernameExist = await userModel.getExistingUsername(username);
    const emailExist = await userModel.getExistingEmail(email);
    if (usernameExist) {
      res.json({message: `username: ${username} has been registered!`});
    } else if (emailExist) {
      res.json({message: `email: ${email} has been registered!`});
    } else {
      await userModel.addUser(username, email, password);
      res.json({message: "registration successful!"});
    }
  };

  loginExistUser = async (req, res) => {
    const {email, password} = req.body;
    if (email === undefined || email === "" || password === undefined || password === "") {
      res.json({message: "enter the data correctly!"});
    }

    try {
      const userExist = await userModel.getExistingUser(email, password);
      if (!userExist) {
        const emailExist = await userModel.getExistingEmail(email);
        const passwordExist = await userModel.getExistingEmail(password);
        if (!emailExist) {
          res.json({message: `email: ${email} is not registered!`});
        } else if (!passwordExist) {
          res.json({message: `password is incorrect!`});
        }
      } else {
        console.log(userExist);
        //generate jwt
        const token = jwt.sign(userExist, "shhh123", {expiresIn: "1h"});

        // return token
        return res.json({accessToken: token});
      }
    } catch (error) {
      return res.status(500).send({message: `${error}`});
    }
  };

  getAllUsers = async (req, res) => {
    const allUsers = await userModel.getAllUsers();
    return res.json(allUsers);
  };

  getUserById = async (req, res) => {
    const {id} = req.params;
    try {
      const selectedId = await userModel.getUserById(id);
      if (selectedId) {
        res.json(selectedId);
      } else {
        res.statusCode = 404;
        res.json({message: `id: ${id} doesn't exist!`});
      }
    } catch (error) {
      return res.status(500).send(`${error}`);
    }
  };

  updateUserBio = async (req, res) => {
    const {id} = req.params;
    const {fullname, pronouns, address} = req.body;

    try {
      const selectedId = await userModel.getUserById(id);
      if (selectedId) {
        const userIdExist = await userModel.getUserIdBio(id);
        if (userIdExist) {
          await userModel.updateUserBiodata(fullname, pronouns, address, id);
          return res.json({message: "success update biodata!"});
        } else if (!userIdExist) {
          await userModel.createUserBiodata(fullname, pronouns, address, id);
          return res.json({message: "success create biodata!"});
        }
      } else {
        res.statusCode = 404;
        res.json({message: `user with id: ${id} doesn't exist!`});
      }
    } catch (error) {
      return res.status(500).send({message: `${error}`});
    }
  };
}

module.exports = new UserController();
