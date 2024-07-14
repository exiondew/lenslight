import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
// ---- ----
import connectDB from "./db.js";
import pageRouter from "./routes/pageRouter.js";

//
connectDB();
const app = express();
const port = process.env.PORT;
//

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"));

// router
app.use("/", pageRouter);

app.listen(port, ()  => console.log(`Listening on port ${port}`));