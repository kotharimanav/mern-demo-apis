const ResponseHandler = require("../../utils/responseHandler/response.handler");
const {ERROR,SUCCESS} = require("../../utils/responseHandler/messages");
const adminService = require("./admin.service");
const Admin = require("../../utils/utils/Admin");

exports.createAdmin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return ResponseHandler.internalServerError(res, ERROR.ALL_FIELD_REQUIRED);
  }

  const admin = await adminService.getAdmin(req.body.email);

  if (admin) {
    return ResponseHandler.conflict(res, ERROR.EMIL_ALREADY_REG);
  }

  try {
    await Admin.createAdmin(req.body);
  } catch (error) {
    console.log(error);
    return ResponseHandler.internalServerError(
      res,
      ERROR.INTERNAL_SERVER_ERROR
    );
  }

  return ResponseHandler.success(res, {
    message: SUCCESS.ADMIN_CREATED
  });
};

exports.getAdminById = async (req, res) => {
  if (!req.params.id) {
    return ResponseHandler.internalServerError(res, ERROR.ID_REQUIRED);
  }
  let admin = {};

  try {
    admin = {
      _id,
      email,
      created_at,
      updated_at
    } = await adminService.getAdminById(req.params.id);
  } catch (e) {
    return ResponseHandler.internalServerError(
      res,
      ERROR.INTERNAL_SERVER_ERROR
    );
  }

  return ResponseHandler.success(res, { admin });
};
