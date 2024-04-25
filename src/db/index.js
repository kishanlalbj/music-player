import { connect } from "mongoose";

const connectDB = () => {
  connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => console.log(err));
};

export default connectDB;
