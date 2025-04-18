import { db } from '../db.js';

/*export const likePost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const [likeExists] = await db.query(
      'SELECT * FROM likes WHERE userId = ? AND postId = ?',
      [userId, postId]
    );

    if (likeExists.length > 0) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    const [result] = await db.query(
      'INSERT INTO likes (userId, postId) VALUES (?, ?)',
      [userId, postId]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: 'Failed to like the post' });
    }

    return res.status(200).json({ message: 'Post liked successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};*/


export const likeController = async (req, res) => {
  const userId = req.user.id; 
  const postId = req.params.postId;

  const checkLikeQuery = "SELECT * FROM likes WHERE userId = ? AND postId = ?";
  const insertLikeQuery = "INSERT INTO likes (userId, postId) VALUES (?, ?)";
  const deleteLikeQuery = "DELETE FROM likes WHERE userId = ? AND postId = ?";
  const likeCountQuery = "SELECT COUNT(*) AS likeCount FROM likes WHERE postId = ?";

  db.query(checkLikeQuery, [userId, postId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      // Unliked
      db.query(deleteLikeQuery, [userId, postId], (err, data) => {
        if (err) return res.status(500).json(err);

        // Fetch like count after unliking
        db.query(likeCountQuery, [postId], (err, likeResult) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({
            message: "Post unliked",
            likeCount: likeResult[0].likeCount
          });
        });
      });
    } 
    else {
      // Liked
      db.query(insertLikeQuery, [userId, postId], (err, data) => {
        if (err) return res.status(500).json(err);

        // Fetch like count after liking
        db.query(likeCountQuery, [postId], (err, likeResult) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({
            message: "Post liked",
            likeCount: likeResult[0].likeCount
          });
        });
      });
    }
  });
};



// export const getLikeCount = (req, res) => {
//   const postId = req.params.postId;

//   const query = "SELECT COUNT(*) AS likeCount FROM likes WHERE postId = ?";

//   db.query(query, [postId], (err, result) => {
//     if (err) return res.status(500).json(err);

//     const likeCount = result[0].likeCount;
//     return res.status(200).json({ postId, likeCount });
//   });
// };
