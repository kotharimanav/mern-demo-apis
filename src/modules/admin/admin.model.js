const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = mongoose.model(
  "admin",
  new Schema(
    {
      email: String,
      password: String
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    }
  )
);

module.exports = AdminSchema;
