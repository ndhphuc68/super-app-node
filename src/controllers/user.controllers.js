const db = require("../model");
const User = db.user;

const userService = require("../services/User.service");

exports.getProfileUser = async (req, res) => {
  try {
    if (!req.query.username) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const user = await userService.findUser({ username: req.query.username });
    if (user) {
      res.status(200).send({ success: true, data: user, message: "Success!" });
    } else {
      res.status(500).send({
        message: "ERRR1111",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "ERRR1111",
      success: false,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const user = await userService.findUser({ username: req.body.username });
    console.log(user);
    if (user) {
      const data = await userService.updateUser(user, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        image: req.body.image,
      });
      if (data) {
        const userV1 = await userService.findUser({ username: req.body.username });
        res
          .status(200)
          .send({ success: true, data: userV1, message: "Success!" });
      } else {
        res.status(400).send({ success: false, data: null, message: "False!" });
      }
    } else {
      res.status(400).send({ success: false, data: null, message: "False!" });
    }
  } catch (error) {
    res.status(400).send({ success: false, data: null, message: "False!" });
  }
};
