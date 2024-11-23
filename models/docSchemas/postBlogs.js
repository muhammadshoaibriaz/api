const mongoose = require("mongoose");
const postBlog = new mongoose.Schema({
  writer: { type: String },
  posting_date: { type: String },
  reading_duration: { type: Number },
  title: { type: String },
  description: { type: String },
  url: { type: String },
  likes: { type: Number },
  views: { type: Number },
  user_img: { type: String },
});

const Blog = mongoose.model("Blog", postBlog);
module.exports = Blog;
