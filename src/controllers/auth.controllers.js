const bcrypt = require("bcrypt");
const db = require("../model");
const User = db.user;
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const userService = require("../services/User.service");
const tokenService = require("../services/TokenFirebase.service");

exports.signup = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const user = await userService.findUser({ username: req.body.username });
    if (!user) {
      const newUser = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        role: "USER",
      });

      const val = await userService.createUser(newUser);

      if (val) {
        res.status(200).send({ success: true, data: val, message: "Success!" });
      } else {
        res.status(500).send({
          message: "ERRR",
          success: false,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "ERRR",
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const user = await userService.findUser({
      username: req.body.username,
      role: "USER",
    });

    if (user) {
      //   if (user.status === status.REQUEST) {
      //     return res.status(200).send({
      //       message: "user chưa được duyệt",
      //       success: false,
      //       data: null,
      //     });
      //   }
      let passwordIsValid = await bcrypt.compare(
        req.body.password,
        user.password
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

      const tokenOb = await tokenService.createToken({
        username: user.username,
        token: req.body.token,
      });

      const userRes = {
        id: user.id,
        token: token,
        username: user.username,
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
  } catch (error) {
    res.status(500).send({
      message: "ERRR",
      success: false,
    });
  }
};
