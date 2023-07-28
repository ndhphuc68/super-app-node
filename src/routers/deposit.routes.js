const depositController = require("../controllers/deposit.controller");
module.exports = (app) => {
  const depositController = require("../controllers/deposit.controller");
  const { authJwt } = require("../middleware");
  const router = require("express").Router();

  router.post("/create", depositController.createDepositHistory);

  router.post("/update", depositController.updateStatusDeposit);

  app.use("/api/v1/deposit", [authJwt], router);
};
