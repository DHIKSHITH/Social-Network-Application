const User = require("../model/usermodel");
const Profile = require("../model/profilemodel");
const Post = require("../model/postmodel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      status: "success",
      token,
      data: user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: "fail",
        error: "pls enter the password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(400).json({
        status: "fail",
        error: "password incorrect",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await Post.deleteMany({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.status(200).json({
      msg: "user deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};
