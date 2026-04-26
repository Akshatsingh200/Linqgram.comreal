import express from "express";
import {
  isauthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendresetotp,
  sendVerifyOtp,
  verifymail,
} from "../controllers/authcontroler.js";
import userauth from "../middleware/userauth.js";

const authrouter = express.Router();

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.post("/logout", logout);
authrouter.post("/send-verify-otp", userauth, sendVerifyOtp);
authrouter.post("/verify-account", userauth, verifymail);
authrouter.get("/is-auth", userauth, isauthenticated);
authrouter.post("/send-reset-otp", sendresetotp);
authrouter.post("/reset-password", resetPassword);

export default authrouter;
