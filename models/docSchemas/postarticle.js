const mongoose = require("mongoose");
const postArticle = new mongoose.Schema({
  writer: { type: String },
  posting_date: { type: String },
  reading_duration: { type: Number },
  title: { type: String },
  description: { type: String },
  bannerImage: { type: String },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  user_img: { type: String },
});

const Articles = mongoose.model("Article", postArticle);
module.exports = Articles;
