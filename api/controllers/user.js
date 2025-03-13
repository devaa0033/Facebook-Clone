import { db } from "../db.js";

export const getUser = (req, res) => {
    const userId = req.params.id;
    const q = "SELECT name, username, profilePic, coverPic, Bio,  city, website, YEAR(joinDate) AS joinYear FROM users WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Internal Server Error', error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(data[0]);
    });
}


export const getUserPosts = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM posts WHERE userId = ?";

    db.query(q, [userId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const updateUser = (req, res) => {
    const userId = req.params.userId;
    const {username, name, profilePic, coverPic, Bio, city, website } = req.body;

    const q = "UPDATE users SET `username` = ?,`name`= ? , `profilePic` = ?, `coverPic`= ?, `Bio` = ?, `city` = ?, `website` = ? WHERE id = ?";

    const values = [
        username,
        name,
        profilePic,
        coverPic,
        Bio,
        city,
        website,
        userId
    ]

    db.query(q, values, (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("User has been updated.");
    })
}