import bcrypt from "bcryptjs";
import userModel from "../models/usermodel.js";

// ================= GET USER DATA =================
export const getuserData = async (req, res) => {
  try {
    const userID = req.userID; // ✅ from userauth middleware

    const user = await userModel.findById(userID);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        // ✅ FIXED: was user.isAccountVerified (undefined) — model uses lowercase
        isAccountVerified: user.isaccountverified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= UPDATE PROFILE (NEW FEATURE) =================
export const updateProfile = async (req, res) => {
  try {
    const userID = req.userID;
    const { name, currentPassword, newPassword } = req.body;

    if (!name && !newPassword)
      return res.json({ success: false, message: "Nothing to update" });

    const user = await userModel.findById(userID);
    if (!user) return res.json({ success: false, message: "User not found" });

    // Update name if provided
    if (name) {
      if (name.trim().length < 2)
        return res.json({ success: false, message: "Name must be at least 2 characters" });
      user.name = name.trim();
    }

    // Update password if provided
    if (newPassword) {
      if (!currentPassword)
        return res.json({ success: false, message: "Current password is required to set a new password" });

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.json({ success: false, message: "Current password is incorrect" });

      if (newPassword.length < 6)
        return res.json({ success: false, message: "New password must be at least 6 characters" });

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isaccountverified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= DELETE ACCOUNT (NEW FEATURE) =================
export const deleteAccount = async (req, res) => {
  try {
    const userID = req.userID;
    const { password } = req.body;

    if (!password)
      return res.json({ success: false, message: "Password is required to delete account" });

    const user = await userModel.findById(userID);
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Incorrect password" });

    await userModel.findByIdAndDelete(userID);

    // Clear the auth cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
