const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/usermodel");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(400).json({
        status: "fail",
        error: "you are not logged in",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select("-password");
    if (!currentUser) {
      res.status(400).json({
        status: "fail",
        error: "user no longer exist",
      });
    }
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err: err,
    });
  }
};
