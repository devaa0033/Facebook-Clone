import {db} from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment/moment.js';
dotenv.config();

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

   // db.query(q, [userId, userId], (err, data) => {
   //  if(err) return res.status(500).json(err);
   //  return res.status(200).json(data);
   // });

   db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);  // Return posts without requiring authentication
    });
}

export const addPost = (req, res) => {
   const userId = req.user.id;

   const q = "INSERT INTO posts(`desc`, `img`, `userid`, `createdAt`) VALUES (?)";

   const values = [
      req.body.desc,
      req.body.img,
      userId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
   ];

   db.query(q, [values], (err, data) => {
      if(err) return res.status(500).json(err);
      return res.status(200).json("Post has been created");
   });
}