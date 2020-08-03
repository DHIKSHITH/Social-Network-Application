const Profile = require("../model/profilemodel");
const User = require("../model/usermodel");
const Post = require("../model/postmodel");

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
