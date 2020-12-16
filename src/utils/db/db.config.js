const mongoose = require("mongoose");
const config = require("../../config");

class DbConnection {
  static async connection() {
    try {
      await mongoose.connect(config.get("dbUrl"), { useNewUrlParser: true });
      console.log("db connected");
    } catch (err) {
      console.log("db not connected", err);
    }
  }
}

module.exports = DbConnection;
