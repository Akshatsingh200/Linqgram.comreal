import express from "express";
import userauth from "../middleware/userauth.js";
import { getuserData, updateProfile, deleteAccount } from "../controllers/userController.js";

const userrouter = express.Router();

userrouter.get("/data", userauth, getuserData);
userrouter.put("/update", userauth, updateProfile);       // ✅ NEW: update name/password
userrouter.delete("/delete", userauth, deleteAccount);    // ✅ NEW: delete account

export default userrouter;
