import mongoose from "mongoose";
// ✅ Fix karo — sirf yeh rakho
const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URL}mern-auth`, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  });
};

export default connectDB;
