import { db } from '../db.js';

export const likePost = async (req, res) => {
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
};
