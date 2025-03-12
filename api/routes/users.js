import express from 'express';
import { getUser, getUserPosts } from '../controllers/user.js';
import { VERIFY_ACCESS_TOKEN } from '../middleware/jwtAuth.js';

const router = express.Router();


router.get('/profile/:userid',VERIFY_ACCESS_TOKEN, getUser );
router.get('/posts/:id', VERIFY_ACCESS_TOKEN, getUserPosts);


export default router