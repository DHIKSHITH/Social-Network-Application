const Profile = require("../model/profilemodel");
const User = require("../model/usermodel");
const Post = require("../model/postmodel");
const { findById } = require("../model/profilemodel");
const { post } = require("../app");

exports.createPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.json({
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
    });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};
exports.getPost = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.post_id).sort({ date: -1 });
    if (!posts) {
      return res.status(404).json({
        msg: "post not found",
      });
    }
    res.json(posts);
  } catch (err) {
    console.log(err);
    if (err.kind === "objectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("server error");
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.post_id);
    if (!posts) {
      return res.status(404).json({
        msg: "post not found",
      });
    }
    if (posts.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }

    await posts.remove();
    res.json({ msg: "post removed" });
  } catch (err) {
    console.log(err);
    if (err.kind === "objectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("server error");
  }
};

exports.like = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (
      post.like.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "post already liked" });
    }
    post.like.unshift({ user: req.user.id });
    const userId = req.user.id;
    const postUser = post.user;
    const postId = post._id;
    const profile = await Profile.findOne({ user: postUser });
    profile.notification.unshift({
      post: postId,
      user: userId,
    });
    await post.save();
    await profile.save();
    res.json({ like: post.like });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

exports.unlike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (
      post.like.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "post has not yet been liked" });
    }
    const removeIndex = post.like
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.like.splice(removeIndex, 1);
    await post.save();
    res.json({ like: post.like });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const newComment = {
      text: req.body.text,
      user: req.user.id,
      name: req.user.name,
    };
    const comment = post.comments.unshift(newComment);
    comments = post.comments;
    await post.save();
    res.status(200).json({
      msg: "comment created",
      comments,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      msg: "no post found",
    });
  }
};
exports.deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.stattus(404).json({ msg: "comment does not exist" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.status(200).json({
      msg: "comment deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "no comment to delete",
    });
  }
};
