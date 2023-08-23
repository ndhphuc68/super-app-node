const db = require("../model");
const Message = db.message;

const messageService = require("../services/Message.service");
const userService = require("../services/User.service");
const pushNotication = require("../plugins/NotificationFirebase");
const tokenService = require("../services/TokenFirebase.service");

exports.createMessage = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const message = new Message({
      username: req.body.username,
      isRead: false,
      message: req.body.message,
      toUser: req.body.toUser,
    });

    const messageOb = await messageService.createMessage(message);

    if (messageOb) {
      const token = await tokenService.findToken({ username: req.body.toUser });
      if (token) {
        await pushNotication.sendNotification(token.token);
      }

      res
        .status(200)
        .send({ success: true, data: messageOb, message: "Success!" });
    } else {
      res.status(500).send({
        message: "ERRR",
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

exports.getListMessageUser = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const listMessageUser = await messageService.findListMessage({
      username: req.body.username,
    });

    const listMessageToUser = await messageService.findListMessage({
      username: req.body.toUser,
    });

    const listMessage = [...listMessageUser, ...listMessageToUser];

    let listMessageSort = listMessage.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res
      .status(200)
      .send({ success: true, data: listMessageSort, message: "Success!" });
  } catch (error) {
    res.status(500).send({
      message: "ERRR1111",
      success: false,
    });
  }
};

exports.getListUserSendMessage = async (req, res) => {
  try {
    if (!req.query.username) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const listUserV2 = await messageService.getListUser("username", {
      toUser: req.query.username,
    });

    const listUserV1 = await messageService.getListUser("toUser", {
      username: req.query.username,
    });

    const listUser = [...listUserV1, ...listUserV2];

    if (listUser) {
      const newList = unique(listUser);

      let response = [];
      for (const val in newList) {
        let user = await userService.findUser({ username: listUser[val] });
        if (user) {
          let data = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            lastMessage: "Aloo đi nhậu",
          };
          response.push(data);
        }
      }
      return res
        .status(200)
        .send({ success: true, data: response, message: "Success!" });
    }

    return res
      .status(200)
      .send({ success: true, data: [], message: "Success!" });
  } catch (error) {
    res.status(500).send({
      message: "ERRR1111",
      success: false,
    });
  }
};

function unique(arr) {
  var formArr = arr.sort();
  var newArr = [formArr[0]];
  for (let i = 1; i < formArr.length; i++) {
    if (formArr[i] !== formArr[i - 1]) {
      newArr.push(formArr[i]);
    }
  }
  return newArr;
}
