const mongoose = require("mongoose");
const Appointments = mongoose.Schema({
  doctor_name: { type: String },
  doc_image: { type: String },
  patient_name: { type: String },
  patient_image: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  day: { type: String },
  specialist: { type: String },
  hospital: { type: String },
  time: { type: String },
  booked_time: { type: String },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "DocAccounts" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  genderType: { type: String },
  age: { type: String },
  problem: { type: String },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "done", "missed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Appointment", Appointments);
