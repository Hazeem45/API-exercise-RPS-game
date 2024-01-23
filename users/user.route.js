const express = require("express");
const userController = require("./user.controller");
const authorization = require("../middleware/authorization");
const protection = require("../middleware/protection");
const {checkSchema} = require("express-validator");
const schemaValidation = require("../middleware/schemaValidation");
const {registrationSchema, loginSchema} = require("./user.schema");
const userRouter = express();

// API to Register new user
userRouter.post("/register", checkSchema(registrationSchema), schemaValidation, userController.registerNewUser);

// API to Login to existing user
userRouter.post("/login", checkSchema(loginSchema), schemaValidation, userController.loginExistUser);

// API to get All existing user
userRouter.get("/", authorization, userController.getAllUsers);

// API to get user by id
userRouter.get("/:id", authorization, userController.getUserById);

// API to update user biodata
userRouter.put("/biodata/:id", authorization, protection, userController.updateUserBio);

module.exports = userRouter;
