const mongoose = require("mongoose");

const Admin = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admins = mongoose.model("Admin", Admin);
module.exports = Admins;
