import {db} from '../db.js';



// Add Comment
export const addComments = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;
    const desc = req.body.desc;
    
    try {
        // Insert new comment into the comments table
        const [result] = await db.execute("INSERT INTO comments (userid, postid, `desc`, createdAt) VALUES (?, ?, ?, NOW())", 
            [userId, postId, desc]);

        // Get the new comment with its id
        const [newComment] = await db.execute("SELECT * FROM comments WHERE id = ?", [result.insertId]);

        return res.status(201).json({
            message: 'Comment added successfully',
            comment: newComment[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to add comment',
            error: error.message
        });
    }
}



// Get Comments for a Post
export const getComments = async (req, res) => {
    const postId = req.params.postId;
    try {
        const [comments]  = await db.execute("SELECT c.*, u.username, u.profilePic FROM comments c JOIN users u ON c.userid = u.id WHERE c.postid = ? ORDER BY createdAt DESC",
     [postId]);
        return res.status(200).json({
            comments: comments
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ message: "Failed to fetch comments", error: error.message });
    }
}


//Delete Comment
export const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const [result] = await db.execute("DELETE FROM comments WHERE id = ?", [commentId]);
        if(result.affectedRows === 0){
            return res.status(404).json({ error: "Comment not found"});
        }
        return res.status(200).json({ message: "Comment deleted successfully"});
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ error: "Server error", details: error});
    }
}