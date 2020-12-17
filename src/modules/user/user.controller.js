const userService = require("./user.service");
const ResponseHandler = require("../../utils/responseHandler/response.handler");
const {ERROR,SUCCESS} = require("../../utils/responseHandler/messages");
const STATUS = require("../../utils/responseHandler/status.code");

exports.userInfo = async (req, res) => {
  let users = [];

  const search = req.query.search || '';
  const sort_field = req.query.sort_field || 'created_at';
  const sort_direction = req.query.sort_direction || 1;

  try {
    users = await userService.getAllusers(search,sort_field,sort_direction);
  } catch (error) {
    console.log(error);
    return ResponseHandler.internalServerError(
      res,
      ERROR.INTERNAL_SERVER_ERROR
    );
  }
  return ResponseHandler.success(res, { users: users });
};

exports.createUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.age) {
    return ResponseHandler.internalServerError(res, ERROR.ALL_FIELD_REQUIRED);
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };

  let userDetails = {};

  try {
    userDetails = await userService.createUser(user);

    if (!userDetails) {
      return ResponseHandler.internalServerError(res, ERROR.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
    return ResponseHandler.internalServerError(
      res,
      ERROR.INTERNAL_SERVER_ERROR
    );
  }
  return ResponseHandler.success(res, { userDetails });
};

exports.updateUser = async (req, res) => {
  if(!req.params.id){
    return ResponseHandler.notFound(res, ERROR.ID_REQUIRED);
  }

  const user = {
    name: req.body.name ,
    age: req.body.age
  };

  try {
    await userService.updateUser(req.params.id,user);
  } catch (error) {
    console.log(error);
    return ResponseHandler.internalServerError(
      res,
      ERROR.INTERNAL_SERVER_ERROR
    );
  }
  return ResponseHandler.send(res,STATUS.SUCCESS, SUCCESS.USER_UPDATED);
};

exports.removeUser = async (req, res) => {
  if(!req.params.id){
    return ResponseHandler.notFound(res, ERROR.ID_REQUIRED);
  }

  try {
    await userService.removeUser(req.params.id);
  } catch (error) {
    console.log(error);
    return ResponseHandler.internalServerError(
      res,
      ERROR.INTERNAL_SERVER_ERROR
    );
  }

  return ResponseHandler.send(res,STATUS.SUCCESS, SUCCESS.USER_REMOVED);
};