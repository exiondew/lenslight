import express from "express";
import { getAboutPage, getIndexPage } from "../controllers/pageController.js";
import photoRouter from "./photoRouter.js";
import authRouter from "./authRouter.js";
import dashboardRouter from "./dashboardRouter.js";
import { checkUser } from "../middlewares/authMiddleware.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use("*", await checkUser);

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.use("/photos", photoRouter);
router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);
router.use("/users", userRouter);

export default router;
