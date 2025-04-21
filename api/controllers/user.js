import { db } from "../db.js";
import cloudinary from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


  
  export const getUser = async (req, res) => {
    const userId = req.params.id;
    const q = "SELECT name, username, profilePic, coverPic, Bio, city, website, YEAR(joinDate) AS joinYear FROM users WHERE id = ?";

    try {
        const [data] = await db.query(q, [userId]);
        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(data[0]);
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};


export const getUserPosts = async (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM posts WHERE userId = ?";

  try {
      const [data] = await db.query(q, [userId]);
      return res.status(200).json(data);
  } catch (err) {
      return res.status(500).json({ message: 'Failed to retrieve posts', error: err.message });
  }
};



  export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, name, Bio, city, website } = req.body;

  try {
    let profilePicUrl = null;

    if (req.file) {

      const result = await cloudinary.uploader.upload(req.file.path);
      profilePicUrl = result.secure_url;

      // Optionally remove uploaded file
      fs.unlink(req.file.path, (err) => {
        if (err) console.warn("Failed to remove local file:", err);
      });
    }

    let q;
    let values;

    if (profilePicUrl) {
      q = `
        UPDATE users SET 
          username = ?, 
          name = ?, 
          profilePic = ?, 
          Bio = ?, 
          city = ?, 
          website = ?
        WHERE id = ?
      `;
      values = [username, name, profilePicUrl, Bio, city, website, userId];
    } else {
      q = `
        UPDATE users SET 
          username = ?, 
          name = ?, 
          Bio = ?, 
          city = ?, 
          website = ?
        WHERE id = ?
      `;
      values = [username, name,  Bio, city, website, userId];
    }

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Database Update Error:", err);
        return res.status(500).json({ message: "Failed to update user", error: err });
      }

      return res.status(200).json({ message: "User has been updated successfully." });
    });

  } catch (error) {
    console.error("UpdateUser error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


export const updateCoverImage = async (req, res) => {
  const userId = req.params.id;

  try {
    if(!req.file){
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const coverPicUrl = result.secure_url;

    // Optionally remove uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.warn("Failed to remove local file:", err);
    });

    const q = "UPDATE users SET coverPic = ? WHERE id = ?";
    db.query(q, [coverPicUrl, userId], (err, data) => {
      if (err) {
        console.error("Database Update Error:", err);
        return res.status(500).json({ message: "Failed to update cover image", error: err });
      }

      return res.status(200).json({ message: "Cover image has been updated successfully." });
    });
    
  } catch (error) {
    console.log("Error updating cover image:", error);
    res.status(500).json({ message: "Failed to update cover image", error: error.message });
  }
}
  





