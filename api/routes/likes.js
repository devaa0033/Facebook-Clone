import express from 'express';
import { likePost } from '../controllers/like.js';
import { VERIFY_ACCESS_TOKEN } from '../middleware/jwtAuth.js';
const router = express.Router();

router.post("/addLike",VERIFY_ACCESS_TOKEN, likePost);


export default router