import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    console.log("HEADER:", header);

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;