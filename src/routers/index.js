module.exports = (app) => {
  require("./user/user.routes")(app);
  require("./user/auth.routes")(app);
  require("./user/deposit.routes")(app);
  require("./user/helpcenter.routes")(app);

  require("./admin/authadmin.routes")(app);
  require("./admin/useradmin.router")(app);
};
