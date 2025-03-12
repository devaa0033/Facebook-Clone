import express from 'express';
import { login, logout, register } from '../controllers/auth.js';
import { VERIFY_ACCESS_TOKEN} from '../middleware/jwtAuth.js';
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/logout',VERIFY_ACCESS_TOKEN, logout);


export default router