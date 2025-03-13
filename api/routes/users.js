import express from 'express';
import { getUser, getUserPosts, updateUser } from '../controllers/user.js';
import { VERIFY_ACCESS_TOKEN } from '../middleware/jwtAuth.js';

const router = express.Router();


router.get('/profile/:id', VERIFY_ACCESS_TOKEN, getUser );
router.get('/posts/:id', VERIFY_ACCESS_TOKEN, getUserPosts);
router.put('/update/:id', VERIFY_ACCESS_TOKEN, updateUser);



export default router