const express = require("express");
const usercontroller = require("../contoller/usercontroller");

const userRouter = express.Router();

userRouter.route("/signup").post(usercontroller.signup);
userRouter.route("/login").post(usercontroller.login);

module.exports = userRouter;
