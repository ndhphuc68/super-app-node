module.exports = (app) => {
  require("./user/auth.routes")(app);
  require("./user/message.routes")(app);
  require("./user/user.routes")(app);
  require("./user/upload.routes")(app);
};
