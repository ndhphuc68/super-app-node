const db = require("../model");
const DepositHistory = db.deposithistory;

exports.createDepositHistory = async (data) => {
  let dataReturn = null;
  await DepositHistory.create(data)
    .then((val) => {
      dataReturn = val;
    })
    .catch((err) => {
      return null;
    });
  return dataReturn;
};

exports.getListDepositHistory = async (val) => {
  let dataReturn = null;
  await DepositHistory.find(val)
    .then(async (value) => {
      dataReturn = value;
    })
    .catch((err) => {});
  return dataReturn;
};

exports.deleteDepositHistory = async (val) => {
  await DepositHistory.deleteOne(val)
    .then(async (value) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

exports.findDepositHistoryByUserNameAndStatus = async (val) => {
  let dataReturn = null;
  await DepositHistory.find(val)
    .then(async (value) => {
      if (value) {
        dataReturn = value;
      }
    })
    .catch((err) => {
      return false;
    });
  return !dataReturn;
};

exports.findDepositHistory = async (val) => {
  let dataReturn = null;
  await DepositHistory.find(val)
    .then(async (value) => {
      if (value) {
        dataReturn = value;
      }
    })
    .catch((err) => {
      return null;
    });
  return dataReturn;
};

exports.updateDepositHistory = async (deposit, val) => {
  let dataReturn = null;
  await DepositHistory.updateOne(deposit, { $set: val })
    .then((data) => {
      dataReturn = data;
    })
    .catch((err) => {
      return null;
    });
  return !!dataReturn;
};
