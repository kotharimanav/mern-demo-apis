const config = require("../../config");
const adminService = require("./../../modules/admin/admin.service");
const ResponseHandler = require("../responseHandler/response.handler");
const bcrypt = require("bcrypt");

class Admin {
  static async createAdmin(admin) {
    bcrypt.hash(admin.password, config.get("saltRound"), async (err, hash) => {
      if (err) {
        return ResponseHandler.internalServerError(
          res,
          ERROR.INTERNAL_SERVER_ERROR
        );
      }

      await adminService.createAdmin({
        email: admin.email,
        password: hash
      });
    });
  }
}

module.exports = Admin;
