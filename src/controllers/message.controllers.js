const db = require("../model");
const Message = db.message;

const messageService = require("../services/Message.service");
const userService = require("../services/User.service");
const pushNotication = require("../plugins/NotificationFirebase");

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
      await pushNotication.sendNotification();
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

    const listUser = await messageService.getListUser({
      toUser: req.query.username,
    });

    if (listUser) {
      let response = [];
      for (const val in listUser) {
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
