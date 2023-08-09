const db = require("../model");
const Nef = db.nef;

exports.createNef = async (data) => {
  let dataReturn = null;
  await Nef.create(data)
    .then((val) => {
      dataReturn = val;
    })
    .catch((err) => {
      return null;
    });
  return dataReturn;
};

exports.getListNef = async () => {
  let dataReturn = null;
  await Nef.find()
    .then(async (value) => {
      dataReturn = value;
    })
    .catch((err) => {});
  return dataReturn;
};

// exports.deleteHelpCenter = async (val) => {
//     await Nef.deleteOne(val)
//         .then(async (value) => {
//             return true;
//         })
//         .catch((err) => {
//             return false;
//         });
// };
