const db = require("../model");
const DepositHistory = db.deposithistory;

const userMoneyService = require("../services/UserMoney.service");
const depositHistoryService = require("../services/DepositHistory.service");
const { status } = require("../const/status");
const { returnRes } = require("../utils");

exports.getListDepositHistory = async (req, res) => {
  try {
    if (!req.params.id) {
      res
        .status(400)
        .send({ success: false, message: "Content can not be empty!" });
    }

    const listDeposit = await depositHistoryService.findDepositHistory({
      username: req.params.id,
    });

    returnRes(res, "success", true, listDeposit);
  } catch (e) {
    returnRes(res, "false", false, null);
  }
};

exports.createDepositHistory = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const checkDepositHistory =
      await depositHistoryService.findDepositHistoryByUserNameAndStatus({
        username: req.body.username,
        status: status.REQUEST,
      });
    if (!checkDepositHistory) {
      const data = new DepositHistory({
        username: req.body.username,
        moneyRequest: req.body.money,
        status: status.REQUEST,
      });

      const value = await depositHistoryService.createDepositHistory(data);
      if (value) {
        returnRes(res, "success", true, value);
      } else {
        returnRes(res, "false", false, null);
      }
    } else {
      returnRes(res, "false", false, null);
    }
  } catch (e) {
    returnRes(res, "false", false, null);
  }
};

exports.updateStatusDeposit = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const deposit = await depositHistoryService.findDepositHistory({
      username: req.body.username,
      id: req.body.id,
      status: status.REQUEST,
    });
    if (deposit) {
      const val = await depositHistoryService.updateDepositHistory(deposit, {
        status: req.body.status,
      });
      if (val) {
        if (req.body.status === status.ACCEPT) {
          const userMoney = await userMoneyService.findUserMoney({
            username: req.body.username,
          });
          if (userMoney) {
            let money = userMoney[0].money + deposit[0].moneyRequest;
            await userMoneyService.updateUserMoney(userMoney, { money: money });
            return res.status(200).send({
              message: "success",
              success: true,
              data: [],
            });
          }
        }
        return res.status(200).send({
          message: "success",
          success: true,
          data: val,
        });
      }
    }
    return res.status(200).send({
      message: "no exits",
      success: false,
      data: null,
    });
  } catch (e) {
    return res.status(200).send({
      message: "false",
      success: false,
      data: null,
    });
  }
};
