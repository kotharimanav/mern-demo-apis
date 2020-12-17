const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");
const ResponseHandler = require("../../utils/responseHandler/response.handler");
const {ERROR,SUCCESS} = require("../responseHandler/messages");
const adminService = require("../../modules/admin/admin.service");
const Logger = require('./Log');
const logger = new Logger('Auth.js');
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
      logger.log(ERROR.NO_TOKEN)
      return ResponseHandler.internalServerError(res, ERROR.NO_TOKEN);
    }
  }

  static async login(req, res) {
    logger.debug('login api called'+ req.body)
    const email = req.body.email;
    const password = req.body.password;
    const admin = await adminService.getAdmin(email);
    if (email && password && admin) {
      const isLogin = await bcrypt.compare(password, admin.password);

      if (isLogin) {
        const token = jwt.sign(
          { email: email, id: admin._id },
          config.get("securityKey"),
          {
            expiresIn: "24h" // expires in 24 hours
          }
        );
        logger.log(SUCCESS.AUTH_SUCCESS)
        return ResponseHandler.success(res, {
          message: SUCCESS.AUTH_SUCCESS,
          token: token
        });
      } else {
        logger.error(ERROR.INCORRECT_CREDENTIALS)
        return ResponseHandler.inCorrectCredential(
          res,
          ERROR.INCORRECT_CREDENTIALS
        );
      }
    } else {
      logger.error(ERROR.AUTH_FAILED)
      return ResponseHandler.authenticationFailed(res, ERROR.AUTH_FAILED);
    }
  }

  static logout(req, res) {
    return ResponseHandler.success(res, { message: SUCCESS.LOGOUT });
  }
}

module.exports = Auth;
