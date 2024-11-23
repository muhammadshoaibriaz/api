const Admins = require("../models/admin/admin");

const AdminSignUp = async (req, res) => {
  const admin_data = req.body;
  try {
    const admins = new Admins(admin_data);
    await admins.save();
  } catch (error) {
    console.log("Error while creating admin account", error);
  }
};

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admins.findOne({ email, password });
    if (!admin) return res.status(401).send("Invalid Email or Password!");
    // create token
    res.status(200).send({ message: "Logged in successfully!", admin });
    res.status(200).send(admin);
  } catch (error) {
    console.log("Error while admin login!", error.message);
  }
};

module.exports = { AdminSignUp, AdminLogin };
