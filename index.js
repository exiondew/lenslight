import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import {v2 as cloudinary} from "cloudinary";

// ---- ----
import connectDB from "./db.js";
import pageRouter from "./routes/pageRouter.js";

//
connectDB();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.PORT;
//

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));
app.use(express.static("public"));

// router
app.use("/", pageRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));