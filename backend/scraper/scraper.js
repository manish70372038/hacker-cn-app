import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

const scrapeNews = async () => {
  const { data } = await axios.get("https://news.ycombinator.com/");
  const $ = cheerio.load(data);

  const stories = [];

  $(".athing").each((i, el) => {
    if (stories.length >= 10) return false;

    const title = $(el).find(".titleline a").first().text().trim();
    const url = $(el).find(".titleline a").first().attr("href");

    if (!title || !url) return;

    const subtext = $(el).next();
    const points = subtext.find(".score").text().trim();
    const author = subtext.find(".hnuser").text().trim();
    const postedAt =
      subtext.find(".age").attr("title") ||
      subtext.find(".age").text().trim();

    stories.push({ title, url, points, author, postedAt });
  });

  await Story.deleteMany({});
  await Story.insertMany(stories);

  console.log(`[Scraper] ${stories.length} stories saved at`, new Date().toLocaleTimeString());
  return stories;
};

export default scrapeNews;