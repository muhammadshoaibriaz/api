const express = require("express");
const router = express.Router();
const {
  HomePage,
  Create_user,
  UserProfile,
  Appointment,
  LogIn,
  FetchAppointments,
  DeleteAppointment,
  Hospitals,
  GetAppointmentsByUserId,
  UpdateUser,
  WriteMessage,
  GetMessages,
  DeleteAccount,
  GetAllMessages,
  UpdateStatus,
  Specialist1,
  GetAppointmentsByDoctorId,
} = require("../controllers/controllers");

const {
  PostArticle,
  PostBlog,
  GetDocArticles,
  CreateDocAccount,
  DocLogIn,
  GetDoctor,
  GetBlog,
  Specialist,
  PostLikes,
  CountViews,
  UpdateBalance,
  GetDoctorsByCityName,
  UpdateDoctorProfile,
  DeleteDocAccount,
} = require("../controllers/doctorControllers");

const { AdminSignUp, AdminLogin } = require("../controllers/adminController");

router.route("/admin_signup").post(AdminSignUp);
router.route("/admin_login").post(AdminLogin);

router.route("/").get(HomePage);

router.route("/specialist").get(Specialist1);
// Creating new_user route
router.route("/api/user").post(Create_user);

// Update user profile
router.route("/api/user/:id").put(UpdateUser);

// Delete user profile
router.route("/api/user/:userId").delete(DeleteAccount);

// Login to user account
router.route("/api/login").post(LogIn);

// book appointment route
router.route("/api/appointments").post(Appointment);

// get all users profile
router.route("/api/users_profile").get(UserProfile);

// delete appointments by id
router.route("/api/appointments/:id").delete(DeleteAppointment);

// update appointment status
router.route("/api/appointments/:id/status").put(UpdateStatus);

// get dummy hospitals
router.route("/api/hospitals").get(Hospitals);

// API endpoint to fetch available appointments for a doctor
router.route("/api/get_appointments").get(FetchAppointments);
router.route("/api/appointments/:userId").get(GetAppointmentsByUserId);
router
  .route("/api/appointments/sign_up/:doctorId")
  .get(GetAppointmentsByDoctorId);

// Messages endpoint
router.route("/api/messages").post(WriteMessage);
router.route("/api/get_messages").get(GetAllMessages);
router.route("/api/messages/:recipientId").get(GetMessages);

// <-------------------------------------Doctor controls------------------------------------>
// doctor actions likes posts, sign_ups, login

// post article to server
router.route("/api/doc/article").post(PostArticle);

// increment likes by post id
router.route("/api/doc/article/:like").post(PostLikes);

// count views
router.route("/api/doc/article/:postId").put(CountViews);

// post blogs to server
router.route("/api/doc/blog").post(PostBlog);

// create a new doctor account
router.route("/api/doc/sign_up").post(CreateDocAccount);
router.route("/api/doc/sign_up/:id").put(UpdateDoctorProfile);
router.route("/api/doc/sign_up/:idDel").delete(DeleteDocAccount);
router.route("/api/doc/sign_up/:balance").put(UpdateBalance);
router.route("/api/doc/sign_up/:city").get(GetDoctorsByCityName);

// doctor login
router.route("/api/doc/login").post(DocLogIn);

// get available doctor
router.route("/api/doc/get_doctors").get(GetDoctor);

// get doctors by type like specialist
router.route("/api/doc/sign_up:specialist").get(Specialist);

// get doctors post like articles blogs etc
router.route("/api/doc/get_article").get(GetDocArticles);
router.route("/api/doc/get_blogs").get(GetBlog);

module.exports = router;
