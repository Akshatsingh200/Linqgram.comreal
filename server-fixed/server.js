import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import connectDB from "./config/mongodb.js";
import authrouter from "./routes/authrout.js";
import userrouter from "./routes/userrouts.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

// ✅ Allow all origins temporarily to fix CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.options(/.*/, cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(cookieParser());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
app.use(globalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many auth attempts. Please try again later.",
  },
});
app.use("/api/auth", authLimiter);

app.get("/", (req, res) => {
  res.send("Server is running fine ✅");
});

app.use("/api/auth", authrouter);
app.use("/api/user", userrouter);

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
