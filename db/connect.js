const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://ms0319255:1x7557mWWBmuXidw@doctor.hgd1eda.mongodb.net/Doctor?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const connectMongoDb = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(`Failed to connect to MongoDB`, err);
  }
};

module.exports = connectMongoDb;
