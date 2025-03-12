import express from 'express';
import { addPost, getPosts } from '../controllers/post.js';
import { VERIFY_ACCESS_TOKEN } from '../middleware/jwtAuth.js';
const router = express.Router();

router.get("/", getPosts);
router.post("/addPost",VERIFY_ACCESS_TOKEN, addPost);



export default router;