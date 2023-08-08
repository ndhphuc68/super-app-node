const { authJwt, checkAdmin } = require("../../middleware");
const userController = require("../../controllers/user.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.get("/getUser", userController.getListUser);

  router.get("/updateUser/:id", userController.changeStatus);

  router.get("/deleteUser/:id", userController.changeStatus);

  app.use("/api/v1/admin/user", [authJwt, checkAdmin], router);
};
