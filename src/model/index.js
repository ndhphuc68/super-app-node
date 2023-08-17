const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
mongoose.set("strictQuery", true);
db.url = dbConfig.uri;
db.user = require("./Users")(mongoose);
db.token = require("./TokenFirebase")(mongoose);

module.exports = db;
