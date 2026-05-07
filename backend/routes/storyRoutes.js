import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getStories,
  getStory,
  toggleBookmark,
  getBookmarks
} from "../controllers/storyController.js";

const router = express.Router();

router.get("/", getStories);
router.get("/bookmarks", auth, getBookmarks);
router.get("/:id", getStory);
router.post("/:id/bookmark", auth, toggleBookmark);

export default router;