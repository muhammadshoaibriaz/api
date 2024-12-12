const mongoose = require("mongoose");
const reviewsSchema = mongoose.Schema({
  review: { type: String },
  patientName: { type: String },
  patientImg: { type: String },
  patientEmail: { type: String },
  rating: { type: Number },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DocAccounts",
  },
});

const Review = mongoose.model("Review", reviewsSchema);
module.exports = Review;
