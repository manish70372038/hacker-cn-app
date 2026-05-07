import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectdb from "./config/db.js";
import authroutes from "./routes/authRoutes.js";
import scraproutes from "./routes/scraperRoutes.js";
import storyroutes from "./routes/storyRoutes.js";
import scrapeNews from "./scraper/scraper.js";

dotenv.config();
connectdb();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authroutes);
app.use("/api/scrap", scraproutes);
app.use("/api/stories", storyroutes);

const INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Server start hote hi pehli baar scrape karo
  try {
    await scrapeNews();
    console.log("✅ Initial scrape complete");
  } catch (err) {
    console.error("❌ Initial scrape failed:", err.message);
  }

  // Har 15 minute baad auto scrape
  setInterval(async () => {
    try {
      await scrapeNews();
    } catch (err) {
      console.error("❌ Scheduled scrape failed:", err.message);
    }
  }, INTERVAL_MS);
});