import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "lens_light",
    })
    .then(() => console.log("Database is Connected"))
    .catch((err) => console.log(err));
};

export default connectDB;
