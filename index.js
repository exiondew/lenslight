import express from 'express';
import "dotenv/config";
// ---- ----
import connectDB from "./db.js";

//
connectDB();
const app = express();
const port = process.env.PORT;
//

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index");
})

app.listen(port, () => console.log(`Listening on port ${port}`));