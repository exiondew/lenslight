import express from 'express';
import {getAboutPage, getIndexPage} from "../controllers/pageController.js";
import photoRouter from "./photoRouter.js";
import authRouter from "./authRouter.js";

const router = express.Router();

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.use("/photos", photoRouter)
router.use("/auth", authRouter)

export default router;