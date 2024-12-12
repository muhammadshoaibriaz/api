const mongoose = require("mongoose");

const User = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String },
  avatar: { type: String },
  joined: { type: String },
  gender: { type: String },
  city: { type: String },
  blood: { type: String },
  age: { type: String },
  disease: { type: String },
  chosenDate: { type: String },
  status: { type: String, default: "pending" },
});

const Users = mongoose.model("user", User);
module.exports = Users;
