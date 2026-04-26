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

// ✅ Dynamic CORS — works in both dev and production
const allowedOrigins = [
  "http://localhost:5173",
  "https://linqgram.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Global rate limiter — max 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests. Please try again later." },
});
app.use(globalLimiter);

// ✅ Stricter limiter for auth routes (login, register, OTP)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many auth attempts. Please try again later." },
});
app.use("/api/auth", authLimiter);

// API endpoints
app.get("/", (req, res) => {
  res.send("Server is running fine ✅");
});

app.use("/api/auth", authrouter);
app.use("/api/user", userrouter);

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
