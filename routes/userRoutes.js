const express = require("express");
const usercontroller = require("../contoller/usercontroller");
const authController = require("../contoller/authController");
const protect = require("../contoller/protect");

const userRouter = express.Router();

userRouter.route("/signup").post(usercontroller.signup);
userRouter.route("/login").post(usercontroller.login);
userRouter.route("/protect").get(authController.protect, protect.protect);
userRouter
  .route("/delete")
  .delete(authController.protect, usercontroller.deleteAccount);

module.exports = userRouter;
