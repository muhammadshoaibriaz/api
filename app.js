const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const controllers = require("./routes/route");
const mongoDb = require("./db/connect");
const mongooseDatabase = require("./userDb");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "doyux5mj8",
  api_key: "869138434164782",
  api_secret: "uOFk1ocUAqFDPRgAxJu3CRd4d4E",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/", controllers);

app.listen(PORT, async (req, res) => {
  try {
    console.log("Server is running on port ", PORT);
    await mongoDb();
    await mongooseDatabase();
  } catch (error) {
    console.log("error connecting to the database: ", error);
  }
});
