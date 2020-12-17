const mongoose = require("mongoose");
const config = require("../../config");
const Logger = require('../utils/Log');
const logger = new Logger('db.config.js');

class DbConnection {
  static async connection() {
    try {
      await mongoose.connect(config.get("dbUrl"), { useNewUrlParser: true });
      logger.log("db connected");
      
    } catch (err) {
      logger.log("db not connected", err);
    }
  }
}

module.exports = DbConnection;
