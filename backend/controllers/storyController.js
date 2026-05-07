import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";
import User from "../models/User.js"; // Zaroori hai bookmarks ke liye

// 1. Web Scraper Logic
export const scrapeStories = async () => {
  try {
    console.log("Scraping started...");
    const { data } = await axios.get("https://news.ycombinator.com/");
    const $ = cheerio.load(data);
    const stories = [];

    $(".athing").slice(0, 10).each((index, element) => {
      const title = $(element).find(".titleline > a").text();
      const url = $(element).find(".titleline > a").attr("href");
      const subtext = $(element).next();
      const points = subtext.find(".score").text() || "0 points";
      const author = subtext.find(".hnuser").text() || "unknown";
      const postedAt = subtext.find(".age").text() || "recently";

      stories.push({ title, url, points, author, postedAt });
    });

    if (stories.length > 0) {
      await Story.deleteMany({}); 
      await Story.insertMany(stories);
      console.log("✅ Success: Database updated with 10 fresh stories.");
      return stories;
    }
  } catch (error) {
    console.error("❌ Scraping Error:", error.message);
  }
};

// 2. Get All Stories
export const getStories = async (req, res) => {
  try {
    // Points ke basis par descending order mein sort karna
    const stories = await Story.find().sort({ points: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories" });
  }
};

// 3. Get Single Story
export const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: "Error fetching story" });
  }
};

// 4. Toggle Bookmark
export const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const storyId = req.params.id;

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
    } else {
      // Add bookmark
      user.bookmarks.push(storyId);
    }

    await user.save();
    res.json({ message: isBookmarked ? "Removed" : "Bookmarked", bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: "Error toggling bookmark" });
  }
};

// 5. Get Bookmarks (Iska hi error aa raha tha)
export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("bookmarks");
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookmarks" });
  }
};

// 6. Manual Scrape Trigger
export const triggerScrape = async (req, res) => {
  try {
    const data = await scrapeStories();
    res.status(200).json({ message: "Scraping successful", data });
  } catch (error) {
    res.status(500).json({ message: "Manual scraping failed" });
  }
};