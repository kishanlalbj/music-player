import mongoose, { connect } from "mongoose";

const connectDB = () => {
  console.log("Attempting to connect");
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => console.log(err));
};

export default connectDB;
