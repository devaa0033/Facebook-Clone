import express from 'express';
import { addPost, getPosts, getUserPost } from '../controllers/post.js';
import { VERIFY_ACCESS_TOKEN } from '../middleware/jwtAuth.js';
import { upload } from '../middleware/FileMulter.js';
const router = express.Router();

router.get("/", getPosts);
router.post("/addPost",upload.single('img'),VERIFY_ACCESS_TOKEN, addPost);
router.get("/profile/:username",VERIFY_ACCESS_TOKEN, getUserPost);



export default router;