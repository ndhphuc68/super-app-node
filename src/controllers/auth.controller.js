const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../model");
const User = db.user;

exports.login = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  User.findOne({ id: req.body.username })
    .then((data) => {
      if (data) {
        var passwordIsValid = bcrypt.compare(req.body.password, data.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Invalid Password!",
            success: false,
            data: null,
          });
        }

        const token = jwt.sign({ id: data.id }, config.secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

        const userRes = {
          id: data.id,
          nickname: data.nickname,
          token: token,
        };

        res.status(200).send({
          message: null,
          success: true,
          data: userRes,
        });
      } else {
        res.status(400).send({
          message: "User not found",
          success: false,
          data: userRes,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "User not found",
        success: false,
      });
    });
};
