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
  } catch (error) {}
};
