import express from 'express';
import { likeController } from '../controllers/like.js';
import { VERIFY_ACCESS_TOKEN } from '../middleware/jwtAuth.js';
const router = express.Router();

// router.post("/addLike",VERIFY_ACCESS_TOKEN, likePost);

router.put("/:id/like",VERIFY_ACCESS_TOKEN, likeController);


export default router