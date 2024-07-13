import mongoose from 'mongoose'

const connectDB = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "lens_light",
    }).then(() => console.log("db is connected ")).catch((err) => console.log(err));
}

export default connectDB;