const UserSchema = require("./user.model");

exports.createUser = async userDetails => {
  return await UserSchema.create(userDetails);
};

exports.getAllusers = async () => {
  return await UserSchema.find({});
};

exports.updateUser = async (id,userDetails) => {
  return await UserSchema.updateOne({_id:id},{$set:userDetails});
};

exports.removeUser = async (id) => {
  return await UserSchema.deleteOne({_id:id});
};

