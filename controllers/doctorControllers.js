const DocAccounts = require("../models/docSchemas/doctors");
const Blog = require("../models/docSchemas/postBlogs");
const Articles = require("../models/docSchemas/postarticle");

const PostArticle = async (req, res) => {
  const {
    writer,
    posting_date,
    url,
    reading_duration,
    title,
    description,
    likes,
    views,
    user_img,
  } = req.body;
  try {
    let newPost = await Articles.create({
      writer,
      posting_date,
      url,
      reading_duration,
      title,
      description,
      user_img,
      likes: parseInt(likes),
      views: parseInt(views),
    });
    if (!newPost) return res.status(400).send("Fail to create a post");
    return res.status(201).json(newPost);
  } catch (error) {
    console.log("Error in post article : ", error);
  }
};
const PostBlog = async (req, res) => {
  const {
    writer,
    posting_date,
    url,
    reading_duration,
    title,
    description,
    likes,
    views,
    user_img,
  } = req.body;
  try {
    let newPost = await Blog.create({
      writer,
      posting_date,
      url,
      reading_duration,
      title,
      description,
      user_img,
      likes: parseInt(likes),
      views: parseInt(views),
    });
    if (!newPost) return res.status(400).send("Fail to create a post");
    return res.status(201).json(newPost);
  } catch (error) {
    console.log("Error in post article : ", error);
  }
};

const PostLikes = async (req, res) => {
  const like = req.params.like;
  try {
    const post = await Articles.findByIdAndUpdate(
      like,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(400).send("Article does not exist.");
    }
    // Increment the number of likes by one each time this route is hit
    // post.likes++;
    await post.save();
    res.json(post);
    res.status(200).json({ message: "Liked incremented successfully!" });
  } catch (error) {
    console.log("Error liking post!", error);
  }
};

const CountViews = async (req, res) => {
  const postId = req.params.postId;
  try {
    let post = await Articles.findById(postId);
    if (!post) {
      return res.status(400).send("Article does not exist.");
    }
    post.views += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    console.log("Error updating views", error.message);
  }
};

const GetDocArticles = async (req, res) => {
  try {
    const articles = await Articles.find();
    // console.log("articles", articles);
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ status: "Error", message: error });
  }
};

const GetBlog = async (req, res) => {
  try {
    const blog = await Blog.find();
    // console.log("articles", articles);
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ status: "Error", message: error });
  }
};

const CreateDocAccount = async (req, res) => {
  const doctor_data = req.body;
  const { email } = doctor_data;
  // console.log("Email is ", email);
  try {
    const existingDoctor = await DocAccounts.findOne({ email });
    if (!existingDoctor) {
      const newDoctor = new DocAccounts(doctor_data);
      await newDoctor.save();
    } else {
      console.log("Email! Already in use");
    }
  } catch (error) {
    console.log("Error creating doctor account!", error);
  }
};

const UpdateDoctorProfile = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  try {
    const isExist = await DocAccounts.findByIdAndUpdate(id, update);
    if (!isExist) {
      res.status(404).json({ message: "Doctor not exist" });
    }
    res.json(isExist);
    res.status(200).json({ message: "Doctor updated successfully" });
  } catch (err) {
    console.log("Error updating doctors", err.message);
  }
};

const DeleteDocAccount = async (req, res) => {
  const id = req.params.idDel;
  try {
    const deleteDoc = await DocAccounts.findByIdAndDelete(id);
    if (!deleteDoc) {
      res.status(404).json({ message: "Doctor not exist" });
    }
    res.json(deleteDoc);
  } catch (err) {
    console.log("Error deleting doctor", err.message);
  }
};

const UpdateBalance = async (req, res) => {
  const balance = req.params.balance;
  const update = req.body;
  try {
    let docAcc = await DocAccounts.findByIdAndUpdate(balance, update);
    if (!docAcc) {
      res.status(404).json({ message: "User not found!" });
      // console.log("User not found!");
    }
    docAcc.balance += parseInt(balance);
    res.status(200).json(docAcc);
  } catch (error) {
    console.log("Update Balance Error:", error);
  }
};

const DocLogIn = async (req, res) => {
  const { email } = req.body;
  try {
    const docUser = await DocAccounts.findOne({ email });
    if (!docUser) throw Error("User does not exist!");
    else {
      res
        .status(200)
        .send({ message: "Doctor logged in successfully!", docUser });
    }
  } catch (error) {
    console.log("Error logging in the doctor!", error.message);
  }
};

const GetDoctor = async (req, res) => {
  try {
    const doctors = await DocAccounts.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error getting Doctors!", error);
  }
};

const Specialist = async (req, res) => {
  const { specialist } = req.params;
  try {
    const specialists = await DocAccounts.find({ specialist: `${specialist}` });
    res.status(200).json(specialists);
  } catch (error) {
    console.error(`Error getting specialists of ${specialist}:`, error);
    res.status(500).json({ error: `Failed to retrieve specialists` });
  }
};

const GetDoctorsByCityName = async (req, res) => {
  const { city } = req.params;
  try {
    const doctors = await DocAccounts.find({ city });
    res.json(doctors);
  } catch (error) {
    console.log("Error fetching doctor by city name : ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  PostArticle,
  PostBlog,
  GetDocArticles,
  GetBlog,
  CreateDocAccount,
  DocLogIn,
  GetDoctor,
  Specialist,
  PostLikes,
  CountViews,
  UpdateBalance,
  GetDoctorsByCityName,
  UpdateDoctorProfile,
  DeleteDocAccount,
};
