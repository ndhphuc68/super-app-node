const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const userService = require("../../services/User.service.js");
const { role } = require("../../const/role");

const verifyTokenRole = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    const data = jwt.verify(token, config.secret);
    if (!data) {
      return res.status(401).send({
        sussces: false,
        message: "Bạn không có quyền truy cập vào tính năng này!",
      });
    }

    const user = userService.findUser({ username: data.id, role: role.ADMIN });
    if (user) {
      next();
    } else {
      res.status(404).send({ sussces: false, message: null });
    }
  } catch (error) {
    res.status(500).send({ sussces: false, message: error.message });
  }
};

module.exports = verifyTokenRole;
