const authController = require("../../controllers/auth.controllers");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/signup", authController.signup);

  router.post("/login", authController.login);

  app.use("/api/v1", router);
};
