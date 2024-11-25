const Users = require("../models/users");
const appointments = require("../models/appointments");
const hospitals = require("../hospitals.json");
const specialist = require("../specialist.json");
const DocAccounts = require("../models/docSchemas/doctors");
const Messages = require("../models/messages");
// main first page of the app
const HomePage = async (req, res) => {
  res.send(hospitals);
};

const Specialist1 = async (req, res) => {
  res.send(specialist);
};

// checking users which are logged in
const UserProfile = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// creating a new user account
const Create_user = async (req, res) => {
  const {
    username,
    email,
    password,
    phone_number,
    gender,
    city,
    blood,
    avatar,
    age,
    chosenDate,
    joined,
  } = req.body;
  // console.log(username, phone_number, email, password);
  const newUser = new Users({
    username,
    email,
    password,
    phone_number,
    gender,
    city,
    blood,
    avatar,
    age,
    chosenDate,
    joined,
  });
  try {
    // Query the database to find a user with the provided email
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      res.status(200).json({ exists: true });
      console.log("Email already in use");
      return;
    }
    await newUser.save();
    res.status(200).json({ exists: false });
  } catch (error) {
    console.error("Error checking user existence:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update user profile
const UpdateUser = async (req, res) => {
  let id = req.params.id;
  const update = req.body;
  try {
    const update_user = await Users.findByIdAndUpdate(id, update);
    if (!update_user) {
      res.status(404).json({ message: "User not found!" });
      console.log("User not found!");
    }

    res.status(200).json(update_user);
  } catch (error) {
    res.status(500).json({ message: "Server not found" });
  }
};

// delete user
const DeleteAccount = async (req, res) => {
  const userId = req.params.userId;
  try {
    const delete_user = await Users.findByIdAndDelete(userId);
    if (!delete_user) {
      console.log("User not found!");
    }
    res.send({ message: "User deleted successfully!", delete_user });
  } catch (err) {
    console.log("Error deleting user from database!", err);
  }
};

// login existing user
const LogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await Users.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email/password" });
    }
    // Compare passwords
    if (password != user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// book appointments with doctor
const Appointment = async (req, res) => {
  try {
    const {
      doctor_name,
      doc_image,
      patient_name,
      patient_image,
      email,
      phoneNumber,
      day,
      specialist,
      hospital,
      time,
      booked_time,
      doctorId,
      userId,
      status,
      genderType,
      age,
      problem,
    } = req.body;

    // Check if doctor exists
    const doctor = await DocAccounts.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Create new appointment
    const newAppointment = new appointments({
      doctor_name,
      doc_image,
      patient_name,
      patient_image,
      email,
      phoneNumber,
      day,
      specialist,
      hospital,
      time,
      booked_time,
      doctorId,
      userId,
      status,
      genderType,
      age,
      problem,
    });

    await newAppointment.save();
    const currentDate = new Date();
    appointments.updateMany(
      { date: { $lt: currentDate } }, // Find appointments with date less than current date
      { $set: { date: currentDate } } // Update date to current date
    );
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error while booking appointment:", error);
    res.status(500).json({ message: "Failed to book appointment" });
  }

  // Implement background process to remove expired appointments
};

// get appointments by the user id
const GetAppointmentsByUserId = async (req, res) => {
  const userId = req.params.userId;
  // console.log(req.body.doctorId);
  try {
    const userAppointments = await appointments.find({ userId });
    res.status(200).json(userAppointments);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const GetAppointmentsByDoctorId = async (req, res) => {
  const doctorId = req.params.doctorId;
  // console.log(req.body.doctorId);
  try {
    const docAppointments = await appointments
      .find({ doctorId: doctorId })
      .exec();
    res.status(200).json(docAppointments);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// update appointment status
const UpdateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await appointments.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    console.error("Error updating appointment status:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete appointment by user_id
const DeleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAppointment = await appointments.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    return res
      .status(200)
      .json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get appointments
const FetchAppointments = async (req, res) => {
  try {
    const appointment = await appointments.find();
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get hospitals for a specific location
const Hospitals = async (req, res) => {
  res.send(hospitals);
};

// messages endpoint
const WriteMessage = async (req, res) => {
  try {
    const { senderId, recipientId, text } = req.body;

    const message = new Messages({ senderId, recipientId, text });
    await message.save();

    res.status(201).send("Message sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const GetMessages = async (req, res) => {
  const userId = req.params.userId;
  try {
    const message = await Messages.find({
      $or: [{ senderId: userId }, { recipientId: userId }],
    });
    console.log(message);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetAllMessages = async (req, res) => {
  try {
    const message = await Messages.find();
    res.status(200).json(message).send(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  HomePage,
  Create_user,
  Specialist1,
  UserProfile,
  Appointment,
  LogIn,
  FetchAppointments,
  DeleteAppointment,
  Hospitals,
  GetAppointmentsByUserId,
  UpdateUser,
  DeleteAccount,
  WriteMessage,
  GetMessages,
  GetAllMessages,
  UpdateStatus,
  GetAppointmentsByDoctorId,
};