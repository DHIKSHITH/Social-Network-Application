const express = require("express");
const postRouter = express.Router();
const authController = require("../contoller/authController");
const postController = require("../contoller/postController");
postRouter.route("/").post(authController.protect, postController.createPost);
postRouter
  .route("/comment/:post_id")
  .post(authController.protect, postController.createComment);
postRouter.route("/").get(authController.protect, postController.getPosts);
postRouter
  .route("/:post_id")
  .get(authController.protect, postController.getPost);
postRouter
  .route("/:post_id")
  .delete(authController.protect, postController.deletePost);
postRouter
  .route("/like/:post_id")
  .post(authController.protect, postController.like);
postRouter
  .route("/like/:post_id")
  .put(authController.protect, postController.unlike);
postRouter
  .route("/comment/:post_id/:comment_id")
  .delete(authController.protect, postController.deleteComment);
module.exports = postRouter;
