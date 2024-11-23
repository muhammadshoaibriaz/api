const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  senderId: { type: String },
  recipientId: { type: String },
  time: { type: String },
  text: { type: String },
});

const Messages = mongoose.model("Message", messageSchema);
module.exports = Messages;
// function to add a new message to the
