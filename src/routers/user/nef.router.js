const nefController = require("../../controllers/nef.controller");

module.exports = (app) => {
  const router = require("express").Router();

  router.get("/list", nefController.getListNef);

  router.post("/create", nefController.createNef);

  app.use("/api/v1/nef", router);
};
