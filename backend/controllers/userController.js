import User from "../models/User.js";

export const getBookmarks = async (req, res) => {
  const user = await User.findById(req.user.id).populate("bookmarks");

  res.json(user.bookmarks);
};