import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 10000,
    dbName: "mern-auth", // ✅ alag se db name do
  });
  console.log("MongoDB Connected ✅");
};

export default connectDB;
