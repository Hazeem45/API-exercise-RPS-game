const express = require("express");
const userController = require("./user.controller");
const userRouter = express();

// API for Register new user
userRouter.post("/register", userController.registerNewUser);

// API for Login to existing user
userRouter.post("/login", userController.loginExistUser);

// API for get All existing user
userRouter.get("/", userController.allUserData);

module.exports = userRouter;
