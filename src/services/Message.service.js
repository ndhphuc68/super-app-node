const db = require("../model");
const Message = db.message;

exports.createMessage = async (val) => {
  let dataReturn = null;
  await Message.create(val)
    .then((val) => {
      dataReturn = val;
    })
    .catch((err) => {
      return null;
    });
  return dataReturn;
};

exports.findListMessage = async (val) => {
  let dataReturn = null;
  await Message.find(val)
    .then(async (data) => {
      dataReturn = data;
    })
    .catch((err) => {});
  return dataReturn;
};

exports.getListUser = async (username, val) => {
  let dataReturn = null;
  await Message.distinct(username, val)
    .then(async (data) => {
      dataReturn = data;
    })
    .catch((err) => {});
  return dataReturn;
};
