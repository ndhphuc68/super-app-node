const bcrypt = require("bcrypt");
const db = require("../model");
const User = db.user;
const UserMoney = db.usermoney;

const userService = require("../services/User.service");
const userMoneyService = require("../services/UserMoney.service");
const { role } = require("../const/role");
const { status } = require("../const/status");

exports.createUser = async (req, res) => {
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
      createDate: new Date(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      role: role.USER,
      status: status.REQUEST,
    });

    const val = await userService.createUser(newUser);

    if (val) {
      const userMoney = new UserMoney({
        username: req.body.username,
        createDate: new Date(),
        money: 0,
      });
      let check = await userMoneyService.createUserMoney(userMoney);
      if (check) {
        res.status(200).send({ success: true, data: val, message: "Success!" });
      } else {
        res.status(200).send({
          message: "Lỗi tạo tài khoản",
          success: false,
        });
      }
    } else {
      res.status(500).send({
        message: "ERRR",
        success: false,
      });
    }
  }
};

exports.findUser = async (req, res) => {
  if (!req.query.id) {
    res.status(400).send({ success: false, message: "Méo mà đòi get!" });
  }
  const user = await userService.findUser({ id: req.query.id });
  const userMoney = await userMoneyService.findUserMoney({
    username: user.username,
  });
  if (user) {
    const data = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      id: user.id,
      money: userMoney[0].money,
    };
    res.status(200).send({ success: true, data: data, message: "Success!" });
  } else {
    res.status(500).send({
      message: "lỗi biết z được rồi",
      success: false,
    });
  }
};

exports.getListUser = async (req, res) => {
  const user = await userService.getAllUser({ role: role.USER });
  if (user) {
    res.status(200).send({ success: true, data: user, message: "Success!" });
  } else {
    res.status(200).send({ success: false, data: [], message: "Success!" });
  }
};

exports.changeStatus = async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
  }
  const user = await userService.findUser({
    id: req.params.id,
    status: status.REQUEST,
  });

  if (user) {
    const data = await userService.updateUser(user, { status: status.ACCEPT });
    if (data) {
      res.status(200).send({ success: true, data: [], message: "Success!" });
    } else {
      res.status(200).send({ success: false, data: null, message: "False!" });
    }
  } else {
    res.status(200).send({ success: false, data: null, message: "False!" });
  }
};

exports.deleteUser = async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
  }
  const user = await userService.findUser({
    id: req.params.id,
  });

  if (user) {
    const check = await userService.deleteUser(user);
    if (check) {
      res.status(200).send({ success: true, data: null, message: "Success!" });
    } else {
      res.status(200).send({ success: false, data: null, message: "false!" });
    }
  } else {
    res.status(200).send({ success: false, data: null, message: "false!" });
  }
};
