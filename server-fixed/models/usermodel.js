import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifyotp: {
    type: String,
    default: "",
  },
  verifyotpexpireat: {
    type: Number,
    default: 0,
  },
  isaccountverified: {
    type: Boolean,
    default: false,
  },
  resetotp: {
    type: String,
    default: "",
  },
  // ✅ Fixed typo: was "resetotpexpeireat" (wrong) → now "resetotpexpireat" (correct)
  resetotpexpireat: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.models.user || mongoose.model("user", userschema);
export default userModel;
