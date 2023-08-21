const userController = require("../../controllers/user.controllers");

module.exports = (app) => {
  const router = require("express").Router();

  router.get("/info", userController.getProfileUser);

  router.post("/update", userController.updateProfile);
  
  app.use("/api/v1/user", router);
};
