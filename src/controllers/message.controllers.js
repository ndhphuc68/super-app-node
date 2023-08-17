const db = require("../model");
const Message = db.message;

const messageService = require("../services/Message.service");

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

    res
      .status(200)
      .send({ success: true, data: listUser, message: "Success!" });
  } catch (error) {
    res.status(500).send({
      message: "ERRR1111",
      success: false,
    });
  }
};
