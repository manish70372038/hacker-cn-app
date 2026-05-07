import express from "express";
import scrapeNews from "../scraper/scraper.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = await scrapeNews();
  res.json(data);
});

export default router;