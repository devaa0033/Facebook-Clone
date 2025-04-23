import fs from 'fs';
import { db } from '../db.js';
import dotenv from 'dotenv';
import moment from 'moment/moment.js';
import cloudinary from 'cloudinary';
import { upload } from '../middleware/FileMulter.js';

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  Get all posts
export const getPosts = async (req, res) => {
  try {
    const q = `
      SELECT p.*, u.id AS userId, name, profilePic 
      FROM posts AS p 
      JOIN users AS u ON u.id = p.userId
    `;

    const [data] = await db.query(q);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json(err);
  }
};

//  Add post
export const addPost = async (req, res) => {
  try {
    const { desc, userId } = req.body;

    // Check if the logged-in user matches the userId provided
    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json("You can only create a post with your own account.");
    }

    // Check if the file is provided
    if (!req.file) {
      return res.status(400).json("No file uploaded.");
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Delete local file after uploading to Cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });

    const img = result.secure_url;

    // Insert post into the database
    const q = "INSERT INTO posts(`desc`, `img`, `userid`, `createdAt`) VALUES (?)";
    const values = [
      desc,
      img,
      userId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    await db.query(q, [values]);
    return res.status(200).json("Post has been created.");
  } catch (err) {
    console.error("Error creating post:", err);
    return res.status(500).json(err);
  }
};

//  Get posts by username
export const getUserPost = async (req, res) => {
  const username = req.params.username;

  try {
    const [userResult] = await db.query("SELECT id FROM users WHERE username = ?", [username]);
    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userResult[0].id;

    const postQuery = `
      SELECT p.*, u.id AS userId, u.name, u.profilePic
      FROM posts AS p
      JOIN users AS u ON u.id = p.userid
      WHERE p.userid = ?
      ORDER BY p.createdAt DESC
    `;

    const [postData] = await db.query(postQuery, [userId]);
    return res.status(200).json(postData);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return res.status(500).json(err);
  }
};
