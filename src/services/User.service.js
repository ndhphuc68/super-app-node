const db = require("../model");
const User = db.user;

exports.createUser = async (user) => {
  let dataReturn = null;
  await User.create(user)
    .then((val) => {
      val.password = null;
      dataReturn = val;
    })
    .catch((err) => {
      return null;
    });
  return dataReturn;
};

exports.findUser = async (val) => {
  let dataReturn = null;
  await User.findOne(val)
    .then(async (user) => {
      dataReturn = user;
    })
    .catch((err) => {});
  return dataReturn;
};

exports.getAllUser = async (val) => {
  let dataReturn = null;
  await User.find(val)
    .then(async (user) => {
      dataReturn = user;
    })
    .catch((err) => {});
  return dataReturn;
};

exports.updateUser = async (val, newVal) => {
  let dataReturn = null;
  await User.updateOne(val, { $set: newVal })
    .then(async (data) => {
      dataReturn = data;
    })
    .catch((err) => {
      return null;
    });
  return dataReturn;
};

exports.deleteUser = async (val) => {
  await User.deleteOne(val)
    .then(async (value) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};
