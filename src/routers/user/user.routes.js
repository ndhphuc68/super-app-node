module.exports = (app) => {
  const userController = require("../../controllers/user.controller");
  const { authJwt } = require("../../middleware");
  const router = require("express").Router();

  router.get("/info/:id", userController.findUser);

  app.use("/api/v1/users", [authJwt], router);
};
