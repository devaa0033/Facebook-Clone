import express from 'express';
import { followController, getFollowCounts, getFollowers, getFollowing, getFollowSuggestion, isFollowing, unfollowController } from '../controllers/followController.js';
import { VERIFY_ACCESS_TOKEN } from '../middleware/jwtAuth.js';
const router = express.Router();

router.post("/follower", VERIFY_ACCESS_TOKEN ,followController);
router.post("/unfollow", VERIFY_ACCESS_TOKEN ,unfollowController);
router.get("/folloers/:userId", VERIFY_ACCESS_TOKEN ,getFollowers);
router.get("/following/:userId", VERIFY_ACCESS_TOKEN ,getFollowing);
router.get("/isFollowing/:targetUserId", VERIFY_ACCESS_TOKEN ,isFollowing);
router.get("/suggestions", VERIFY_ACCESS_TOKEN ,getFollowSuggestion);
router.get("/follow-counts/:userId", VERIFY_ACCESS_TOKEN ,getFollowCounts);

export default router