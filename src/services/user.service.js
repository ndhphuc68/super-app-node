const db = require("../model");
const User = db.user;

exports.createUser = async (user) => {
  let dataReturn = null;
  await User.create(user)
    .then((val) => {
      val.password = null;
      console.log(val);
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
