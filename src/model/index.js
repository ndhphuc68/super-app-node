const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.uri;
db.user = require("./Users")(mongoose);
db.usermoney = require("./UserMoney")(mongoose);
db.deposithistory = require("./DepositHistory")(mongoose);

module.exports = db;
