const db = require("../model");
const UserMoney = db.usermoney;

exports.createUserMoney = async (user) => {
  let dataReturn = null;
  await UserMoney.create(user)
    .then((val) => {
      dataReturn = val;
    })
    .catch((err) => {
      return null;
    });
  return !!dataReturn;
};

exports.updateUserMoney = async (val, newval) => {
  await UserMoney.updateOne(val, { $set: newval })
    .then(async (data) => {
      return data;
    })
    .catch((err) => {
      return null;
    });
};

exports.findUserMoney = async (val) => {
  let dataReturn = null;
  await UserMoney.find(val)
    .then(async (data) => {
      dataReturn = data;
    })
    .catch((err) => {
      return null;
    });
  return dataReturn;
};
