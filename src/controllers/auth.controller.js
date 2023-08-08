const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../model");
const User = db.user;
const userService = require("../services/User.service");
const { role } = require("../const/role");
const { status } = require("../const/status");

exports.login = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user = await userService.findUser({
    username: req.body.username,
    role: role.USER,
  });

  if (user) {
    if (user.status === status.REQUEST) {
      return res.status(200).send({
        message: "user chưa được duyệt",
        success: false,
        data: null,
      });
    }
    let passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
        success: false,
        data: null,
      });
    }
    const token = jwt.sign({ id: user.username }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 9996400, // 24 hours
    });

    const userRes = {
      id: user.id,
      token: token,
    };

    res.status(200).send({
      message: null,
      success: true,
      data: userRes,
    });
  } else {
    res.status(200).send({
      message: "user méo có login qq",
      success: false,
      data: null,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user = await userService.findUser({
    username: req.body.username,
    role: role.ADMIN,
  });

  if (user) {
    let passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
        success: false,
        data: null,
      });
    }
    const token = jwt.sign({ id: user.username }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 9996400, // 24 hours
    });

    const userRes = {
      id: user.id,
      token: token,
    };

    res.status(200).send({
      message: null,
      success: true,
      data: userRes,
    });
  } else {
    res.status(200).send({
      message: "user méo có login qq",
      success: false,
      data: null,
    });
  }
};

exports.checkToken = async (req, res) => {
  res.status(200).send({
    message: "còn hạn cứ xài ",
    success: true,
    data: null,
  });
};
