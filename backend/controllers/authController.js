import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Register error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login API hit:", email);

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Login error" });
  }
};