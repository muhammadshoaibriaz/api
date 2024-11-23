const mongoose = require("mongoose");
const updateSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  email: { type: String },
});

module.exports = mongoose.model("updateuser", updateSchema);
