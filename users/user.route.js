const express = require("express");
const userController = require("./user.controller");
const userRouter = express();

// API to Register new user
userRouter.post("/register", userController.registerNewUser);

// API to Login to existing user
userRouter.post("/login", userController.loginExistUser);

// API to get All existing user
userRouter.get("/", userController.getAllUsers);

// API to get user by id
userRouter.get("/:id", userController.getUserById);

// API to update user biodata
userRouter.put("/biodata/:id", userController.updateUserBio);

module.exports = userRouter;
