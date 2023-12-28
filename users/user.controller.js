const userModel = require("./user.model");

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
      res.json(userExist);
    }
  };

  allUserData = async (req, res) => {
    const allUsers = await userModel.getAllUsers();
    res.json(allUsers);
  };
}

module.exports = new UserController();
