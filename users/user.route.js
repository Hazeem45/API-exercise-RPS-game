const express = require("express");
const userController = require("./user.controller");
const authorization = require("../middleware/authorization");
const protection = require("../middleware/protection");
const {checkSchema} = require("express-validator");
const schemaValidation = require("../middleware/schemaValidation");
const {registrationSchema, loginSchema, createRoom, updateRoom} = require("./user.schema");
const userRouter = express();

// API to Register new user
userRouter.post("/register", checkSchema(registrationSchema), schemaValidation, userController.registerNewUser);

// API to Login to existing user
userRouter.post("/login", checkSchema(loginSchema), schemaValidation, userController.loginExistUser);

// API to get All existing user
userRouter.get("/", authorization, userController.getAllUsers);

// API to get user by id
userRouter.get("/:id", authorization, protection, userController.getUserById);

// API to update user biodata
userRouter.put("/biodata/:id", authorization, protection, userController.updateUserBio);

// API to create room(player 1)
userRouter.post("/create-room", authorization, checkSchema(createRoom), schemaValidation, userController.createGameRoom);

// API to get all rooms
userRouter.get("/game/rooms", authorization, userController.getAllRooms);

// API to get room details
userRouter.get("/game/rooms/:roomId", authorization, userController.getRoomDetails);

// API to update room(player 2)
userRouter.put("/game/rooms/:roomId", authorization, checkSchema(updateRoom), schemaValidation, userController.updateGameRoom);

// API to get user game history
userRouter.get("/game/history", authorization, userController.getGameHistory);

module.exports = userRouter;
