import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  });
  await mongoose.connect(`${process.env.MONGODB_URL}mern-auth`);
};

export default connectDB;
