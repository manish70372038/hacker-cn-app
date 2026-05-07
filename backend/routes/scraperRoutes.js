import express from "express";
import scrapeNews from "../scraper/scraper.js";

const router = express.Router();

// Manual trigger — POST /api/scrap
router.post("/", async (req, res) => {
  try {
    const data = await scrapeNews();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;