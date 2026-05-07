import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    points: String,
    author: String,
    postedAt: String
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);