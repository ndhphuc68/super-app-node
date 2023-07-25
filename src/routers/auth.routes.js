module.exports = (app) => {
  const userController = require("../controllers/user.controller");
  const authController = require("../controllers/auth.controller");

  var router = require("express").Router();

  router.post("/signup", userController.createUser);

  router.post("/login", authController.login);

  app.use("/api/v1", router);
};
