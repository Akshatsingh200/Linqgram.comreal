import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";
import transporter from "../config/nodemailer.js";

// ================= REGISTER =================
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.json({ success: false, message: "Missing details" });

  // ✅ Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.json({ success: false, message: "Invalid email format" });

  // ✅ Password strength check
  if (password.length < 6)
    return res.json({ success: false, message: "Password must be at least 6 characters" });

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send welcome mail
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Linqgram!",
      text: `Welcome ${name}! Your account has been created with email ID: ${email}`,
    };
    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ success: false, message: "Email and password required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "Invalid email address" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= SEND VERIFY OTP =================
export const sendVerifyOtp = async (req, res) => {
  try {
    // ✅ FIXED: Get userID from middleware (req.userID), not from req.body
    const userID = req.userID;
    const user = await userModel.findById(userID);

    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.isaccountverified) {
      return res.json({ success: false, message: "Account is already verified" });
    }

    // ✅ OTP resend throttle — must wait 1 minute before requesting again
    const oneMinuteAgo = Date.now() - 60 * 1000;
    if (user.verifyotpexpireat && user.verifyotpexpireat - 24 * 60 * 60 * 1000 > oneMinuteAgo) {
      return res.json({
        success: false,
        message: "Please wait 1 minute before requesting a new OTP",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyotp = otp;
    user.verifyotpexpireat = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this code. It expires in 24 hours.`,
    };
    await transporter.sendMail(mailOption);

    res.json({ success: true, message: "Verification OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= VERIFY EMAIL =================
export const verifymail = async (req, res) => {
  // ✅ FIXED: Get userID from middleware
  const userID = req.userID;
  const { otp } = req.body;

  if (!otp) {
    return res.json({ success: false, message: "OTP is required" });
  }

  try {
    const user = await userModel.findById(userID);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (!user.verifyotp || user.verifyotp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyotpexpireat < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isaccountverified = true;
    user.verifyotp = "";
    user.verifyotpexpireat = 0;
    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= IS AUTHENTICATED =================
export const isauthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= SEND RESET OTP =================
export const sendresetotp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.json({ success: false, message: "Email is required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    // ✅ OTP resend throttle — must wait 1 minute
    const oneMinuteAgo = Date.now() - 60 * 1000;
    if (user.resetotpexpireat && user.resetotpexpireat - 15 * 60 * 1000 > oneMinuteAgo) {
      return res.json({
        success: false,
        message: "Please wait 1 minute before requesting a new OTP",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    // ✅ FIXED: correct field name (was resetotpexpeireat — typo)
    user.resetotp = otp;
    user.resetotpexpireat = Date.now() + 15 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. It expires in 15 minutes.`,
    };
    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  const { email, otp, newpassword } = req.body;

  if (!email || !otp || !newpassword)
    return res.json({ success: false, message: "Email, OTP, and new password are required" });

  // ✅ Password strength check
  if (newpassword.length < 6)
    return res.json({ success: false, message: "Password must be at least 6 characters" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (!user.resetotp || user.resetotp !== otp)
      return res.json({ success: false, message: "Invalid OTP" });

    // ✅ FIXED: correct field name
    if (user.resetotpexpireat < Date.now())
      return res.json({ success: false, message: "OTP expired" });

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    user.resetotp = "";
    user.resetotpexpireat = 0;
    await user.save();

    return res.json({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
