const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const db = require("../../model");
const User = db.user;

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  const data = jwt.verify(token, config.secret);
  if (!data) {
    return res.status(401).send({
      sussces: false,
      message: "Bạn không có quyền truy cập vào tính năng này!",
    });
  }
  User.findOne({ nickname: data.id }).then((data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else {
      if (data) {
        next();
      }
      res.status(500).send({ sussces: false, message: err.message });
    }
  });
};

module.exports = verifyToken;
