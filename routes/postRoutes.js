const express = require("express");
const postRouter = express.Router();
const authController = require("../contoller/authController");
const postController = require("../contoller/postController");
postRouter.route("/").post(authController.protect, postController.createPost);

module.exports = postRouter;
