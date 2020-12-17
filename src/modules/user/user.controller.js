const userService = require("./user.service");
const ResponseHandler = require("../../utils/responseHandler/response.handler");
const ERROR = require("../../utils/responseHandler/error.messages");

exports.userInfo = async (req, res) => {
  let users = [];
  try {
    users = await userService.getAllusers();
  } catch (error) {
    return ResponseHandler.internalServerError(
      res,
      ERROR.INTERNAL_SERVER_ERROR
    );
  }
  return ResponseHandler.success(res, { users: users });
};

exports.createUser = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    return ResponseHandler.internalServerError(res, ERROR.ALL_FIELD_REQUIRED);
  }

  const user = {
    name: req.body.name,
    email: req.body.email
  };

  let userDetails = {};

  try {
    userDetails = await userService.createUser(user);

    if (!userDetails) {
      return ResponseHandler.internalServerError(res, ERROR.USER_NOT_FOUND);
    }
  } catch (error) {
    return ResponseHandler.internalServerError(
      res,
      ERROR.INTERNAL_SERVER_ERROR
    );
  }
  return ResponseHandler.success(res, { userDetails });
};
