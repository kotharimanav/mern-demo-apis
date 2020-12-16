const AdminSchema = require("./admin.model");
const mongoose = require("mongoose");

exports.createAdmin = async adminDetails => {
  return await AdminSchema.create(adminDetails);
};

exports.getAdmin = async email => {
  return await AdminSchema.findOne({ email: email });
};

exports.getAdminById = async id => {
  return await AdminSchema.findById(mongoose.Types.ObjectId(id));
};
