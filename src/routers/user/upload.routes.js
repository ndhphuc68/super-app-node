const uploadController = require("../../controllers/upload.controllers");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/file", uploadController.uploadFile);

  app.use("/api/v1/upload", router);
};
