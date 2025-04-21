import { db } from '../db.js';


export const likeController = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  try {
    const [likeResult] = await db.execute(
      "SELECT * FROM likes WHERE userId = ? AND postId = ?",
      [userId, postId]
    );

    if (likeResult.length > 0) {
      // Unlike the post
      await db.execute("DELETE FROM likes WHERE userId = ? AND postId = ?", [userId, postId]);

      const [countResult] = await db.execute(
        "SELECT COUNT(*) AS likeCount FROM likes WHERE postId = ?",
        [postId]
      );

      return res.status(200).json({
        message: "Post unliked",
        likeCount: countResult[0].likeCount
      });
    } else {
      // Like the post
      await db.execute("INSERT INTO likes (userId, postId) VALUES (?, ?)", [userId, postId]);

      const [countResult] = await db.execute(
        "SELECT COUNT(*) AS likeCount FROM likes WHERE postId = ?",
        [postId]
      );

      return res.status(200).json({
        message: "Post liked",
        likeCount: countResult[0].likeCount
      });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err });
  }
};


