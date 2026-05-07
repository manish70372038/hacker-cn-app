import express from "express";
import { login, register } from "../controllers/authController.js";
import { getBookmarks } from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login",login)
router.get("/bookmarks", auth, getBookmarks);
export default router;