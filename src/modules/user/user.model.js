const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = mongoose.model(
  "users",
  new Schema(
    {
      name: String,
      email: String,
      age: Number
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    }
  )
);

module.exports = UserSchema;
