const userModel = require("./user.model");
const jwt = require("jsonwebtoken");

class UserController {
  registerNewUser = async (req, res) => {
    const {username, email, password} = req.body;

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

  createGameRoom = async (req, res) => {
    const {roomName, player1Choice} = req.body;
    const userId = req.token.id;

    try {
      await userModel.createGameRoom(roomName, userId, player1Choice);
      return res.json({message: `${roomName} room successfully created, waiting for player 2 to join and the result will be updated`});
    } catch (error) {
      return res.status(500).send({message: `${error}`});
    }
  };

  getAllRooms = async (req, res) => {
    const allRooms = await userModel.getAllRooms();
    return res.json(allRooms);
  };

  getRoomDetails = async (req, res) => {
    const {roomId} = req.params;
    try {
      const room = await userModel.getRoomDetails(roomId);
      if (!room) {
        return res.send({message: `room with id: ${roomId}, doesnt exist`});
      } else {
        if (room.player2 === null) {
          if (req.token.id !== room.player1.id) {
            room.player1Choice = "Player 1 choice is hidden";
          }
        }
        return res.json(room);
      }
    } catch (error) {
      return res.json(error);
    }
  };

  updateGameRoom = async (req, res) => {
    const {roomId} = req.params;
    const player2Id = req.token.id;
    const {player2Choice} = req.body;
    try {
      const room = await userModel.getRoomDetails(roomId);
      if (player2Id === room.player1.id) {
        return res.json({message: "you cannot play game against yourself!"});
      } else if (room.player2 !== null) {
        return res.json({message: "the game only can be played once"});
      } else {
        let resultP2 = "";
        let resultP1 = "";
        if ((player2Choice === "rock" && room.player1Choice === "rock") || (player2Choice === "paper" && room.player1Choice === "paper") || (player2Choice === "scissor" && room.player1Choice === "scissor")) {
          resultP2 = "draw";
          resultP1 = "draw";
        } else if ((player2Choice === "rock" && room.player1Choice === "scissor") || (player2Choice === "paper" && room.player1Choice === "rock") || (player2Choice === "scissor" && room.player1Choice === "paper")) {
          resultP2 = "win";
          resultP1 = "lose";
        } else if ((player2Choice === "rock" && room.player1Choice === "paper") || (player2Choice === "paper" && room.player1Choice === "scissor") || (player2Choice === "scissor" && room.player1Choice === "rock")) {
          resultP2 = "lose";
          resultP1 = "win";
        }
        console.log(resultP2, resultP1);
        await userModel.updateGameRoom(roomId, resultP1, player2Id, player2Choice, resultP2);
        return res.json({
          player1Choice: room.player1Choice,
          yourChoice: player2Choice,
          your_result: `${resultP2}`,
        });
      }
    } catch (error) {
      return res.json({message: "error"});
    }
  };

  getGameHistory = async (req, res) => {
    const userId = req.token.id;
    const roomFinished = await userModel.getRoomFinished(userId);
    const gameHistory = roomFinished.map((data) => ({
      roomId: data.id,
      roomName: data.roomName,
      player1: data["player1.username"],
      player2: data["player2.username"],
      resultGame: data.player1Id === userId ? data.resultPlayer1 : data.resultPlayer2,
      updatedAt: data.updatedAt,
    }));
    return res.json(gameHistory);
  };
}

module.exports = new UserController();
