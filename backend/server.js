// MERN Notes App - Backend with Node.js, Express, MongoDB, and AWS S3

// 1️⃣ Install required packages before running:
// npm install express mongoose multer aws-sdk cors dotenv

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// MongoDB Schema
const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  imageUrl: String,
});

const Profile = mongoose.model("profiles", ProfileSchema);

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

console.log(process.env.AWS_REGION);

// Multer Storage Config
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST API - Upload Image to S3 & Save Details to MongoDB
app.post("/api/profiles", upload.single("image"), async (req, res) => {
  const { name, email } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: "No image provided" });

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${uuidv4()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    const newProfile = new Profile({
      name,
      email,
      imageUrl: uploadResult.Location,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET API - Fetch Profiles
app.get("/api/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

