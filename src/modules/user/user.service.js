const UserSchema = require("./user.model");

exports.createUser = async userDetails => {
  return await UserSchema.create(userDetails);
};

exports.getAllusers = async (search, sort_field, sort_direction) => {
  return await UserSchema.find({
    $or: [{
      email: {
        $regex: search,
        $options: 'i'
      }
    }, {
      name: {
        $regex: search,
        $options: 'i'
      }
    }]
  }).sort([[sort_field || 'created_at', sort_direction || 1]]).exec();
};

exports.updateUser = async (id, userDetails) => {
  return await UserSchema.updateOne({ _id: id }, { $set: userDetails });
};

exports.removeUser = async (id) => {
  return await UserSchema.deleteOne({ _id: id });
};

