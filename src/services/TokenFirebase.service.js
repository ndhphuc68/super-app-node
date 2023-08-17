const db = require("../model");
const Token = db.token;

exports.createToken = async (token) => {
  let dataReturn = null;
  await Token.create(token)
    .then((val) => {
      dataReturn = val;
    })
    .catch((err) => {
      return null;
    });
  return dataReturn;
};

// exports.findToken = async (val) => {
//   let dataReturn = null;
//   await Token.findOne(val)
//     .then(async (user) => {
//       dataReturn = user;
//     })
//     .catch((err) => {});
//   return dataReturn;
// };

// exports.getAllUser = async (val) => {
//   let dataReturn = null;
//   await Token.find(val)
//     .then(async (user) => {
//       dataReturn = user;
//     })
//     .catch((err) => {});
//   return dataReturn;
// };

// exports.deleteUser = async (val) => {
//   await Token.deleteOne(val)
//     .then(async (value) => {
//       return true;
//     })
//     .catch((err) => {
//       return false;
//     });
// };
