// models/doctor.js
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  // other doctor fields
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

// models/appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  time: Date,
  patientName: String,
  // other appointment fields
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

// routes/appointments.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");

// Endpoint for booking appointments
router.post("/", async (req, res) => {
  try {
    const { doctorId, time, patientName } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Create appointment
    const appointment = new Appointment({
      doctor: doctorId,
      time,
      patientName,
    });

    // Save appointment
    await appointment.save();

    // Send notification to doctor (you'll need to implement this)
    sendNotificationToDoctor(
      doctorId,
      `New appointment booked for ${time} by ${patientName}`
    );

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

// services/notificationService.js
const admin = require("firebase-admin");
const serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendNotificationToDoctor(doctorId, message) {
  try {
    // Fetch doctor's FCM token from database
    const doctor = await Doctor.findById(doctorId);
    const fcmToken = doctor.fcmToken; // Assuming you have a field for storing FCM tokens in the Doctor model

    // Send notification
    await admin.messaging().sendToDevice(fcmToken, {
      notification: {
        title: "New Appointment",
        body: message,
      },
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

module.exports = { sendNotificationToDoctor };
