import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

export const scrapeStories = async () => {
  try {
    console.log("Scraping started...");
    const { data } = await axios.get("https://news.ycombinator.com/");
    const $ = cheerio.load(data);
    const stories = [];

    // Hacker News ki top 10 stories nikalna
    $(".athing").slice(0, 10).each((index, element) => {
      const title = $(element).find(".titleline > a").text();
      const url = $(element).find(".titleline > a").attr("href");
      
      // Subtext se baki info nikalna (points, author, time)
      const subtext = $(element).next();
      const points = subtext.find(".score").text() || "0 points";
      const author = subtext.find(".hnuser").text() || "unknown";
      const postedAt = subtext.find(".age").text() || "recently";

      stories.push({ title, url, points, author, postedAt });
    });

    if (stories.length > 0) {
      // CRITICAL STEP: Purana data delete karo taaki updatedAt fresh ho jaye
      await Story.deleteMany({}); 
      
      // Naya fresh data insert karo
      await Story.insertMany(stories);
      
      console.log("✅ Success: Database updated with 10 fresh stories.");
      return stories;
    }
  } catch (error) {
    console.error("❌ Scraping Error:", error.message);
  }
};

// API Trigger ke liye (POST /api/scrape)
export const triggerScrape = async (req, res) => {
  try {
    const data = await scrapeStories();
    res.status(200).json({ message: "Scraping successful", data });
  } catch (error) {
    res.status(500).json({ message: "Manual scraping failed" });
  }
};