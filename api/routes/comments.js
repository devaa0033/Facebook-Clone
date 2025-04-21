import express from 'express';
import { addComments, deleteComment, getComments } from '../controllers/comment.js';
import { VERIFY_ACCESS_TOKEN } from '../middleware/jwtAuth.js';
const router = express.Router();

router.post("/:postId/comment", VERIFY_ACCESS_TOKEN, addComments);
router.get("/:postId/comments", VERIFY_ACCESS_TOKEN, getComments);
router.delete("/:commentId", VERIFY_ACCESS_TOKEN, deleteComment);


export default router