const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");
const ResponseHandler = require("../../utils/responseHandler/response.handler");
const ERROR = require("../../utils/responseHandler/error.messages");
const SUCCESS = require("../../utils/responseHandler/success.messages");
const adminService = require("../../modules/admin/admin.service");

class Auth {
  static checkToken(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, config.get("securityKey"), (err, decoded) => {
        if (err) {
          return ResponseHandler.unAuthorize(res, ERROR.TOKEN_INVALID);
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return ResponseHandler.internalServerError(res, ERROR.NO_TOKEN);
    }
  }

  static async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
      const admin = await adminService.getAdmin(email);
      const isLogin = await bcrypt.compare(password, admin.password);

      if (isLogin) {
        const token = jwt.sign(
          { email: email, id: admin._id },
          config.get("securityKey"),
          {
            expiresIn: "24h" // expires in 24 hours
          }
        );

        return ResponseHandler.success(res, {
          message: SUCCESS.AUTH_SUCCESS,
          token: token
        });
      } else {
        return ResponseHandler.inCorrectCredential(
          res,
          ERROR.INCORRECT_CREDENTIALS
        );
      }
    } else {
      return ResponseHandler.authenticationFailed(res, ERROR.AUTH_FAILED);
    }
  }

  static logout(req, res) {
    return ResponseHandler.success(res, { message: SUCCESS.LOGOUT });
  }
}

module.exports = Auth;
