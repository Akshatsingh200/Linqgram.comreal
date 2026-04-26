import jwt from "jsonwebtoken";

const userauth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized. Please log in again.",
      });
    }

    const tokendecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokendecoded.id) {
      req.userID = tokendecoded.id; // ✅ attach userID to request
      next();
    } else {
      return res.json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }
  } catch (error) {
    // ✅ Handle expired token specifically
    if (error.name === "TokenExpiredError") {
      return res.json({ success: false, message: "Session expired. Please log in again." });
    }
    res.json({ success: false, message: "Token verification failed." });
  }
};

export default userauth;
