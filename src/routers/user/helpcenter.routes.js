module.exports = (app) => {
  const depositController = require("../../controllers/deposit.controller");
  const { authJwt } = require("../../middleware");
  const router = require("express").Router();

  router.post("/create", depositController.createDepositHistory);

  router.post("/update", depositController.updateStatusDeposit);

  router.get("/getList/:id", depositController.getListDepositHistory);

  app.use("/api/v1/helpCenter", [authJwt], router);
};
