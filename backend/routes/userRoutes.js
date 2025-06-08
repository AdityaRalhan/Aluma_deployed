import express from 'express';
import { signup, login, getUserInfo, updateUserInfo } from '../controllers/user.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// console.log("✅ userRoutes loaded");

router.post("/signup", signup)
router.post("/login", login);
router.get("/user", authenticate, getUserInfo);
router.put("/user/update", authenticate, updateUserInfo);

export default router;