const mongoose = require("mongoose");
const docSignUp = new mongoose.Schema({
  phone_number: { type: String },
  bio: { type: String },
  name: { type: String },
  email: { type: String },
  gender: { type: String },
  dateOfBirth: { type: String },
  workingSince: { type: String },
  image: { type: String },
  specialist: { type: String },
  documents: { type: Array },
  videoCallFee: { type: String },
  textFee: { type: String },
  visitFee: { type: String },
  phoneCallFee: { type: String },
  videoCallFee: { type: String },
  video_consultation: { type: String },
  phone_call: { type: String },
  text_conversation: { type: String },
  actual_visit: { type: String },
  video_call: { type: String },
  availability: { type: Array },
  reviews: { type: Number },
  rating: { type: Number },
  timing: { type: String },
  ending: { type: String },
  joining_date: { type: String },
  city: { type: String },
  balance: { type: Number, default: 0 },
  degree: { type: String },
  hospitals: { type: Array },
});

const DocAccounts = mongoose.model("DocAccounts", docSignUp);
module.exports = DocAccounts;

// 	{
// 		"actual_visit": true,
// 		"newUpdatedData": {
// 			"documents": [[Object], [Object]],
// 		 	"formData": {
// 			 		"bio": "Title: Understanding Fever: Causes, Symptoms, and Treatment of Common Fever Diseases",
// 			 		"dateOfBirth": "Thu May 02 2024",
// 			 		"email": "ms0319255@gmail.com",
// 			 		"gender": "Male",
// 			 		"image": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FDoctor-09c40b84-3574-4df2-a201-72dd927103e8/ImagePicker/8173ab36-9205-4a33-9f8b-e387abf48280.jpeg",
// 			 		"name": "Muhammad Shoaib",
// 			 		"phone_number": "6464646",
// 			 		"specialist": "Dentist ",
// 			 		"workingSince": "2011"
// 		 	}
// 		},
// 		"phoneCallFee": "500",
// 		"phone_call": true,
// 		"textFee": "500",
// 		"text_conversation": true,
// 		"videoCallFee": "1500",
// 		"video_call": true,
// 		"video_consultation": true,
// 		"visitFee": "3000"
// }
