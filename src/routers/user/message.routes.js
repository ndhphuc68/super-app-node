const messageController = require("../../controllers/message.controllers");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/create", messageController.createMessage);

  router.post("/getList", messageController.getListMessageUser);

  router.get("/listUser", messageController.getListUserSendMessage);

  app.use("/api/v1/message", router);
};
