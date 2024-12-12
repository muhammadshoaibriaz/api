const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  comment: {
    type: String,
  },
  authorName: {
    type: String,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  authorImg: {
    type: String,
  },
  date: {
    type: String,
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
