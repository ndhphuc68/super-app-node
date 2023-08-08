const authController = require("../../controllers/auth.controller");

const router = require("express").Router();

module.exports = (app) => {
  router.post("/login", authController.loginAdmin);

  app.use("/api/v1/admin", router);
};
