import fs from 'fs';
import {db} from '../db.js';
import dotenv from 'dotenv';
import moment from 'moment/moment.js';
dotenv.config();
import cloudinary from 'cloudinary';
import { upload } from '../middleware/FileMulter.js';



export const getPosts = (req, res) => {
   // const userId = req.user.id;

//    const q = `
//          SELECT p.*, u.id AS userId, name, profilePic 
//          FROM posts AS p 
//          JOIN users AS u ON u.id = p.userId
//          LEFT JOIN relationships AS r ON r.followedUserId = p.userId
//          WHERE r.followerUserId = ? OR p.userId = ?
//          ORDER BY p.createdAt DESC
//  `;

   const q = `
         SELECT p.*, u.id AS userId, name, profilePic 
         FROM posts AS p 
         JOIN users AS u ON u.id = p.userId
 `;

   db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);  
    });
}



// Setup cloudinary configuration
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
 });
 
export const addPost = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    addPostHandler(req, res);
  });
};

export const addPostHandler = (req, res) => {
  const { desc, userId } = req.body; 

  if (req.user.id !== parseInt(userId)) {
    return res.status(403).json("You can only create a post with your own account.");
  }

  if (req.file) {
    cloudinary.uploader.upload(req.file.path, (result) => {
      if (result.error) {
        return res.status(500).json({ error: result.error.message });
      }

     
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error deleting local file:', err);
        }
      });


      const img = result.secure_url;
      const q = "INSERT INTO posts(`desc`, `img`, `userid`, `createdAt`) VALUES (?)";
      const values = [
        desc,
        img,
        userId,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
      });
    });
  } else {
    return res.status(400).json("No file uploaded.");
  }
};































 