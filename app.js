const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const controllers = require("./routes/route");
const mongoDb = require("./db/connect");
const mongooseDatabase = require("./userDb");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.use("/", controllers);

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.listen(PORT, async (req, res) => {
  try {
    console.log("Server is running on port ", PORT);
  } catch (error) {
    console.log("error connecting to the database: ", error);
  }
});
