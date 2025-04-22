import {db} from '../db.js';

export const followController = async (req, res) => {
    console.log("Request body:", req.body); 
    const {targetUserId} = req.body;
    const userId = req.user.id;

     // Check for missing data
     if (typeof userId === "undefined" || typeof targetUserId === "undefined") {
        return res.status(400).json({ message: "Missing user ID or target user ID." });
    }


    try {
        if(userId === targetUserId){
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        // Check if user is already following the target user
        const [existingFollow] = await db.execute("SELECT * FROM relationships WHERE follower_id = ? AND following_id = ?", [userId, targetUserId]);
        if (existingFollow.length > 0) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        // Insert new follow into the follows table
        const [result] = await db.execute("INSERT INTO relationships (follower_id, following_id) VALUES (?, ?)", [userId, targetUserId]);

        return res.status(201).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to follow user', error: error.message });
    }
}

export const unfollowController = async (req, res) => {
    const {targetUserId} = req.body;
    const userId = req.user.id;

    if (typeof userId === "undefined" || typeof targetUserId === "undefined") {
        return res.status(400).json({ message: "Missing user ID or target user ID." });
    }
    

    try {
        // Check if user is following the target user
        const [existingFollow] = await db.execute("SELECT * FROM relationships WHERE follower_id = ? AND following_id = ?", [userId, targetUserId]);
        if (existingFollow.length === 0) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        // Delete the follow from the follows table
        const [result] = await db.execute("DELETE FROM relationships WHERE follower_id = ? AND following_id = ?", [userId, targetUserId]);

        return res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to unfollow user', error: error.message });
    }
}


export const getFollowers = async(req, res) => {
    const {userId} = req.params;
    const q = "SELECT users.id, users.name, users.profilePic FROM relationships JOIN users ON relationships.follower_id = users.id WHERE relationships.following_id = ?";

    try {
        const [data] = await db.query(q, [userId]);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching followers:", error);
        return res.status(500).json({ message: "Failed to fetch followers", error: error.message });
    }
}

export const getFollowing = async(req, res) => {
    const {userId} = req.params;
    const q = "SELECT users.id, users.name, users.profilePic FROM relationships JOIN users ON relationships.following_id = users.id WHERE relationships.follower_id = ?";

    try {
        const [data] = await db.query(q, [userId]);
        return res.status(200).json(data);
        
    } catch (error) {
        console.error("Error fetching following:", error);
        return res.status(500).json({ message: "Failed to fetch following", error: error.message });
    }
}

export const isFollowing = async (req, res) => {
    const userId = req.user?.id;
    const targetUserId = req.params?.targetUserId;

    if (!userId || !targetUserId) {
        return res.status(400).json({ message: "Missing user ID or target user ID" });
    }

    try {
        const [data] = await db.execute(
            "SELECT * FROM relationships WHERE follower_id = ? AND following_id = ?",
            [userId, targetUserId]
        );

        return res.status(200).json({ isFollowing: data.length > 0 });
    } catch (error) {
        console.error(" Query failed:", error);
        return res.status(500).json({ message: "Failed to check following status", error: error.message });
    }
};


export const getFollowSuggestion = async (req, res) => {
    const userId = req.user?.id;
    try {
        const [users] = await db.query("SELECT id, name , profilePic FROM users WHERE id != ? AND id NOT IN (SELECT following_id FROM relationships WHERE follower_id = ?) LIMIT 5", [userId, userId]);
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching follow suggestions:", error);
        return res.status(500).json({ message: "Failed to fetch follow suggestions", error: error.message });
    }
}


export const getFollowCounts = async (req, res) => {
    const {userId} = req.params;

    if(!userId){
        return res.status(400).json({ message: "User ID is required"});
    }

    try {
        const [followersResult] = await db.query("SELECT COUNT(*) AS followers FROM relationships WHERE following_id = ?", [userId]);

        const [followingResult] = await db.query("SELECT COUNT(*) AS following FROM relationships WHERE follower_id = ?", [userId]);

        return res.status(200).json({
            followers: followersResult[0].followers,
            following: followingResult[0].following
        });
        
    } catch (error) {
        console.error("Error fetching follow counts:", error);
        return res.status(500).json({ message: "Failed to fetch follow counts", error: error.message });
    }
}



