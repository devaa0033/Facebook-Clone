export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id = ?";

    db.query[q, [userId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    }]
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
    const { name, desc, profilePic } = req.body;

    const q = "UPDATE users SET `username` = ?, `email` = ?, `profilePic` = ?, `coverPic`= ?, `city` = ?, `website` = ? WHERE id = ?";

    db.query(q, [name, desc, profilePic, userId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("User has been updated.");
    })
}