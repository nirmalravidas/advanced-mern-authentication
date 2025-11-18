import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } from "../controller/user.controller";

const router = express.Router();

router.get("/check-auth", isAuthenticated, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password/:token", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/verify-email", verifyEmail);
router.put("/profile/update", isAuthenticated ,updateProfile);

export default router;