const bcrypt = require("bcrypt");
const db = require("../model");
const User = db.user;

exports.createUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.findOne({ nickname: req.body.nickname }).then(async (user) => {
    if (!user) {
      const newUser = new User({
        id: req.body.id,
        nickname: req.body.nickname,
        password: await bcrypt.hash(req.body.password, 10),
        createDate: new Date(),
      });
      User.create(newUser)
        .then((val) => {
          val.password = null;
          res
            .status(200)
            .send({ success: true, data: val, message: "Success!" });
        })
        .catch((err) => {
          res.status(500).send({
            message: "ERRR",
            success: false,
          });
        });
    }
  });
};

exports.findUser = async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
  }

  User.findOne({ nickname: req.params.id })
    .then(async (user) => {
      user.password = null;
      res.status(200).send({ success: true, data: user, message: "Success!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        success: false,
      });
    });
};
