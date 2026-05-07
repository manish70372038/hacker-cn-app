import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

const scrapeNews = async () => {
  const { data } = await axios.get("https://news.ycombinator.com/");
  const $ = cheerio.load(data);

  const stories = [];

  $(".athing").each((i, el) => {
    if (i < 10) {
      const title = $(el).find(".titleline a").text();
      const url = $(el).find(".titleline a").attr("href");
      const subtext = $(el).next();
      const points = subtext.find(".score").text();
      const author = subtext.find(".hnuser").text();
      const postedAt = subtext.find(".age").text();

      stories.push({ title, url, points, author, postedAt });
    }
  });

  // Upsert — url se match karo, naya ho toh insert, purana ho toh update
  const ops = stories.map((story) => ({
    updateOne: {
      filter: { url: story.url },
      update: { $set: { ...story, updatedAt: new Date() } },
      upsert: true,
    },
  }));

  await Story.bulkWrite(ops);
  console.log(`[Scraper] ${stories.length} stories upserted at`, new Date().toLocaleTimeString());
  return stories;
};

export default scrapeNews;