const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DocAccounts",
  },
  sender: { type: String }, // "user" or "doctor"
  content: { type: String },
  timestamp: { type: Date, default: Date.now },
  time: { type: String },
  read: { type: Boolean, default: false },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
