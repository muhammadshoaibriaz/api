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
  GetMessages,
  DeleteAccount,
  UpdateStatus,
  Specialist1,
  GetAppointmentsByDoctorId,
  GetPatientDetails,
  SendMessage,
  CheckUnreadMessages,
  MarkMessagesAsRead,
  GetAllMessages,
  GetPatientMessages,
} = require("../controllers/controllers");

const {
  PostArticle,
  PostBlog,
  GetDocArticles,
  CreateDocAccount,
  DocLogIn,
  CountLikes,
  GetDoctor,
  GetBlog,
  Specialist,
  PostLikes,
  CountViews,
  UpdateDoctorStatus,
  UpdateBalance,
  GetDoctorsByCityName,
  UpdateDoctorProfile,
  DeleteDocAccount,
  GetPendingDoctor,
  CountBlogViews,
  Recommended,
  Comments,
  GetComments,
  Reviews,
  GetCommentsByPostId,
  GetDoctorReviews,
} = require("../controllers/doctorControllers");

const { AdminSignUp, AdminLogin } = require("../controllers/adminController");

router.route("/admin_signup").post(AdminSignUp);
router.route("/admin_login").post(AdminLogin);

router.route("/").get(HomePage);

router.route("/specialist").get(Specialist1);
// Creating new_user route
router.route("/api/user").post(Create_user);
// router.route("/api/user").post(upload.single("image"), Create_user);

// Update user profile
router.route("/api/user/:id").put(UpdateUser);

// Delete user profile
router.route("/api/user/:userId").delete(DeleteAccount);

// Login to user account
router.route("/api/login").post(LogIn);

// book appointment
router.route("/api/appointments").post(Appointment);

// get all users profile
router.route("/api/users_profile").get(UserProfile);
router.route("/api/user/:details").get(GetPatientDetails);

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
router.route("/api/messages").post(SendMessage);
router.route("/api/get_messages").get(GetAllMessages);
router.route("/api/messages/:doctorId").get(GetPatientMessages);
router.route("/api/messages/:userId/:doctorId").get(GetMessages);

router.route("/api/messages/:doctorId").get(CheckUnreadMessages);
router.route("/api/messages/mark_as_read/:doctorId").put(MarkMessagesAsRead);

// /api/messages/:userId/:doctorId'
// <-------------------------------------Doctor controls------------------------------------>

// doctor actions likes posts, sign_ups, login

// post article
router.route("/api/doc/article").post(PostArticle);
router.route("/api/doc/blog").post(PostBlog);

// increment likes by post id
router.route("/api/doc/article/:like").post(PostLikes);
router.route("/api/doc/blog/:like").post(CountLikes);

// count views
router.route("/api/doc/article/:postId").put(CountViews);
router.route("/api/doc/blog/:postId").put(CountBlogViews);

// create a new doctor account
router.route("/api/doc/sign_up").post(CreateDocAccount);
router.route("/api/doc/sign_up/:id/status").put(UpdateDoctorStatus);
router.route("/api/doc/sign_up/:id").put(UpdateDoctorProfile);
router.route("/api/doc/sign_up/:idDel").delete(DeleteDocAccount);
router.route("/api/doc/sign_up/:balance").put(UpdateBalance);
router.route("/api/doc/sign_up/:city").get(GetDoctorsByCityName);
router.route("/api/doc/reviews").post(Reviews);
router.route("/api/doc/reviews/:doctorId").get(GetDoctorReviews);

// doctor login
router.route("/api/doc/login").post(DocLogIn);

// get available doctor
router.route("/api/doc/get_doctors").get(GetDoctor);
router.route("/api/doc/pending_doctor").get(GetPendingDoctor);

// get doctors by type like specialist
router.route("/api/doc/sign_up:specialist").get(Specialist);
router.route("/api/doc/recommendations").get(Recommended);
// get doctors post like articles blogs etc
router.route("/api/doc/get_article").get(GetDocArticles);
router.route("/api/doc/get_blogs").get(GetBlog);
router.route("/api/comments").post(Comments);
router.route("/api/get_comments").get(GetComments);
router.route("/api/comments/:postId").get(GetCommentsByPostId);

// update comments

module.exports = router;
