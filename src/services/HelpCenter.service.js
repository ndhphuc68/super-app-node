const db = require("../model");
const HelpCenter = db.helpCenter;

exports.createHelpCenter = async (data) => {
  let dataReturn = null;
  await HelpCenter.create(data)
    .then((val) => {
      dataReturn = val;
    })
    .catch((err) => {
      return null;
    });
  return dataReturn;
};

exports.getListHelpCenter = async (val) => {
  let dataReturn = null;
  await HelpCenter.find(val)
    .then(async (value) => {
      dataReturn = value;
    })
    .catch((err) => {});
  return dataReturn;
};

exports.deleteHelpCenter = async (val) => {
  await HelpCenter.deleteOne(val)
    .then(async (value) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};
