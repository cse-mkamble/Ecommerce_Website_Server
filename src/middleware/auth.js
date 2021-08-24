const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const userModel = require("../models/users");

exports.loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    token = token.replace("Bearer ", "");
    decode = jwt.verify(token, JWT_SECRET);
    req.userDetails = decode;
    next();
  } catch (err) {
    res.json({
      error: "You must be logged in",
    });
  }
};

exports.isAuth = (req, res, next) => {
  let { loggedInUserId } = req.body;
  if (
    !loggedInUserId ||
    !req.userDetails._id ||
    loggedInUserId != req.userDetails._id
  ) {
    res.status(403).json({ error: "You are not authenticate" });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  try {
    let reqUser = await userModel.findById(req.body.loggedInUserId);
    // If user role 0 that's mean not admin it's customer
    if (reqUser.userRole === 0) {
      res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch {
    res.status(404);
  }
};


exports.authMiddleware = async (req, res, next) => {
  try {
      const token = req.header("Authorization")
      if(!token) return res.status(400).json({msg: "Invalid Authentication."})
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      if(!decoded) return res.status(400).json({msg: "Invalid Authentication."})
      const user = await userModel.findOne({_id: decoded.id})
      req.user = user
      next()
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}