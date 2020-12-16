const UserSchema = require("./user.model");

exports.createUser = async userDetails => {
  return await UserSchema.create(userDetails);
};

exports.getAllusers = async () => {
  return await UserSchema.find({});
};
