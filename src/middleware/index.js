const authJwt = require("../middleware/modules/authJwt");
const checkAdmin = require("../middleware/modules/checkRole");

module.exports = {
  authJwt,
  checkAdmin,
};
