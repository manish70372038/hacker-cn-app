import Story from "../models/Story.js";
import User from "../models/User.js";

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ points: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching stories" });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("bookmarks");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching bookmarks" });
  }
};

export const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ msg: "Story not found" });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching story" });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const storyId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const exists = user.bookmarks.some(
      (id) => id.toString() === storyId
    );

    if (exists) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId
      );
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();
    res.json({
      msg: "Bookmark updated",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({ msg: "Bookmark error" });
  }
};