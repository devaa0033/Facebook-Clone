import express from 'express';
import { getUser, getUserPosts, updateCoverImage, updateUser } from '../controllers/user.js';
import { VERIFY_ACCESS_TOKEN } from '../middleware/jwtAuth.js';
import { upload } from '../middleware/FileMulter.js';

const router = express.Router();


router.get('/profile/:id', VERIFY_ACCESS_TOKEN, getUser );
router.get('/posts/:id', VERIFY_ACCESS_TOKEN, getUserPosts);
router.put('/update/:id', VERIFY_ACCESS_TOKEN, upload.single('img'), updateUser);
router.put('/cover/:id', VERIFY_ACCESS_TOKEN, upload.single('coverPic'), updateCoverImage);


export default router